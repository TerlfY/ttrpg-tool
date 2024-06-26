"use client";

import { useState, useTransition } from "react";
import addChannelMember from "@/actions/addChannelMember";

import Link from "next/link";
import Button from "@/app/_components/Button";
import DropdownSelection from "@/app/_components/inputs/DropdownSelection";
import { useRouter } from "next/navigation";
import FeedbackCard from "@/app/_components/FeedbackCard";

type CreateChannelProp = {
  serverId: string;
  channelId: string;
  notChannelMembers: { label: string; value: string }[];
};
export default function AddMemberForm({
  serverId,
  channelId,
  notChannelMembers,
}: CreateChannelProp) {
  const [users, setUsers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <form
      action={async () => {
        startTransition(async () => {
          const result = await addChannelMember(users, channelId);
          if (typeof result === "string") {
            setError(result);
            return;
          }
          router.push(`/server/${serverId}/chat/${channelId}`);
          router.refresh();
        });
      }}
    >
      {notChannelMembers.length > 0 ? (
        <DropdownSelection
          options={notChannelMembers}
          onSelect={(s) => setUsers(s.map((item) => item.value.toString()))}
          multiple
        />
      ) : (
        <p>No more members to add on this server</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link href={`/server/${serverId}/chat/${channelId}`}>
          <Button className="btn-secondary" disabled={isPending}>
            Cancel
          </Button>
        </Link>
        <Button className="btn-primary" type="submit" disabled={isPending}>
          Add members
        </Button>
      </div>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </form>
  );
}
