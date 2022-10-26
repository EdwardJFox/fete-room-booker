import { H1, P } from "../../../../Typography";
import GroupMembers from "./components/GroupMembers";

// Default screen for showing the group you are in and its details
const GroupsMainScreen = ({ user, group }) => {
  console.log("user", JSON.stringify(user, null, 2));
  console.log("group", JSON.stringify(group, null, 2));

  if (!user.groupMember.approved) {
    return <P>Your join request is still pending!</P>
  }

  return (
    <>
      <H1>{ group.name }</H1>
      <GroupMembers members={group.members}isOwner={user.groupMember.owner} />
    </>
  )
}

export default GroupsMainScreen;