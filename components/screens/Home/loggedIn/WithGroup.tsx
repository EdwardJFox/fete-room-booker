import { Prisma } from "@prisma/client";
import UserPreferencesForm from "../../../UserPreferences/Form";
import GroupHeader from "./components/GroupHeader";
import GroupMembers from "./components/GroupMembers";
import Pending from "./components/Pending";

type LoggedInWithGroupScreenProps = {
  user: Prisma.UserGetPayload<{
    include: {
      groupMember: true,
      preferences: true,
    }
  }>;

  group: Prisma.GroupGetPayload<{
    include: {
      members: {
        include: {
          user: true
        }
      }
    }
  }>
};

// Default screen for showing the group you are in and its details
const LoggedInWithGroupScreen = ({ user, group }: LoggedInWithGroupScreenProps) => {
  if (!user?.groupMember?.approved) {
    return (
      <Pending
        groupName={group.name}
        preferences={user.preferences}/>
    );
  }

  return (
    <div className="max-w-2xl mx-2 sm:mx-auto">
      <GroupHeader name={group.name} />
      <GroupMembers
        members={group.members}
        isOwner={user.groupMember.owner}
        loggedInUserId={user.id}
        groupId={group.id}
        code={group.code} />
      <UserPreferencesForm preferences={user.preferences} />
    </div>
  )
}

export default LoggedInWithGroupScreen;