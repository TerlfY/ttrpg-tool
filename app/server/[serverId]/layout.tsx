import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import {
  getServerData,
  getServerMembers,
} from "../../../prisma/services/serverService";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import FeedbackCard from "../../_components/FeedbackCard";
import UserInfo from "../../_components/UserInfo";
import ServerSettingsMenu from "./_components/SettingsMenu";
import TopMenu from "@/app/_components/TopMenu";

export default async function ServerLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const id = params.serverId;

  const server = await getServerData(id);
  const members = await getServerMembers(id);

  if (
    !server ||
    typeof server === "string" ||
    !members ||
    typeof members === "string"
  )
    return (
      <div className="flex-grow">
        <FeedbackCard type="error" message="Something went wrong!" />
      </div>
    );

  const admin = members.filter((item) => item.role === "admin")[0];
  const regulars = members.filter((item) => item.role === "member");

  return (
    <div className="flex flex-grow">
      {/*server inner nav*/}
      <ColumnWrapper
        mode="section"
        id="server-inner-nav"
        className="h-full border-r border-r-black50 p-0 md:max-w-[15%]"
      >
        <RowWrapper className="z-30 border-b border-black50 px-2 pt-1">
          <h5 className="text-wrap">{server.server_name}</h5>{" "}
          <ServerSettingsMenu server_id={id} />
        </RowWrapper>
      </ColumnWrapper>

      {/*top menu and content*/}
      <ColumnWrapper
        align="items-start"
        className="m-0 flex-grow gap-0 p-0 lg:gap-2"
      >
        <TopMenu serverId={id} />
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      <ColumnWrapper
        mode="section"
        id="server-members-nav"
        className="bg-color-dark"
      >
        <ColumnWrapper className="h-full">
          <h5>Admin</h5>
          <UserInfo
            username={admin.user.username || ""}
            screen_name={
              admin.nickname
                ? admin.nickname
                : admin.user.screen_name || admin.user.username
            }
            image={admin.icon ? admin.icon : admin.user.profile_image || ""}
            isActive={false}
            width={40}
          />
          <h5>Members</h5>
          {regulars.map((item) => (
            <UserInfo
              key={item.id}
              username={item.user.username || ""}
              screen_name={
                item.nickname
                  ? item.nickname
                  : item.user.screen_name || item.user.username
              }
              image={item.icon ? item.icon : item.user.profile_image || ""}
              isActive={false}
              width={40}
            />
          ))}
        </ColumnWrapper>
      </ColumnWrapper>
    </div>
  );
}