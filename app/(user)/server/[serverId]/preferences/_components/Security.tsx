"use client";
import editServerConfig from "@/actions/serverManagement/editServerConfig";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import PasswordInput from "@/app/_components/inputs/PasswordInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
import ToggleInput from "@/app/_components/inputs/ToggleInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type ServerSecurityProps = {
  serverAuth: ServerAuth;
  config: ServerConfig;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
};

export default function ServerSecurity({
  serverAuth,
  config,
  isPending,
  startTransition,
}: ServerSecurityProps) {
  const [configData, setConfigData] =
    useState<Omit<ServerConfig, "id" | "password_hash">>(config);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = configData.protected
    ? password === confirmPassword
    : true;
  const passwordExists = config.password_hash ? true : false;

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!passwordsMatch) {
      setError("Password-protected is selected but passwords don't match.");
      return;
    }
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
      } else {
        startTransition(async () => {
          try {
            const result = await editServerConfig(
              serverAuth.member_id,
              config,
              {
                ...configData,
                password: password === "" ? undefined : password,
              },
            );
            setSuccess(true);
            router.refresh();
          } catch (e) {
            setError((e as Error).message);
            return;
          }
        });
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <ColumnWrapper
        mode="section"
        id="security"
        align="content-start items-start mb-8"
      >
        <h4>Password protection</h4>
        <ToggleInput
          id="password-protection"
          label="Password-protected server"
          labelClass="text-md-lg xl:text-lg"
          onByDefault={configData.protected}
          checked={configData.protected}
          onToggle={(checked) =>
            setConfigData({ ...configData, protected: checked })
          }
          disabled={isPending}
        />
        <small>Invitees must know the password to join</small>
        <PasswordInput
          className="self-start"
          placeholder="new password"
          required={configData.protected && !passwordExists}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
        {!passwordsMatch && (
          <small className="text-warning">{"Passwords don't match"}</small>
        )}
        <PasswordInput
          className="self-start"
          placeholder="confirm new password"
          required={configData.protected && !passwordExists}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isPending}
        />

        <h4 className="mt-5">Who can customise server settings</h4>
        <small>* this setting is exclusive for server admin</small>
        <RadioGroup
          groupName="settings-rights-holders"
          values={["Admin", "Admin and Moderators", "All members"]}
          selected={configData.config_permission}
          radioStyle={{
            radioBg: "bg-white",
            selectedColour: "fill-black75",
            radioSize: "1.85rem",
          }}
          className="w-[60%] flex-col gap-4 [&>*:nth-child(1)]:bg-[#5DA364] [&>*:nth-child(2)]:bg-[#B8AF5F] [&>*:nth-child(3)]:bg-[#9B3F3F]"
          labelStyle="w-full justify-between px-4 py-2 text-md-lg xl:text-lg"
          setSelected={(s) => {
            setConfigData({ ...configData, config_permission: s!.toString() });
          }}
          disabled={isPending}
          readonly={serverAuth.role !== "admin"}
        />
        <Button className="btn-primary my-4" type="submit">
          Save
        </Button>
        {success && (
          <FeedbackCard type="success" message="Settings have been saved" />
        )}
        {error !== "" && <FeedbackCard type="error" message={error} />}
      </ColumnWrapper>
    </form>
  );
}
