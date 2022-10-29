import { H1, P } from "../../../Typography";
import GroupActions from "./components/GroupActions";
import GroupMembers from "./components/GroupMembers";

// Default screen for showing the group you are in and its details
const LoggedInWithGroupScreen = ({ user, group }) => {
  if (!user.groupMember.approved) {
    return <P>Your join request to { group.name } is pending!</P>
  }

  return (
    <>
      <H1>{ group.name }</H1>
      <GroupMembers members={group.members} isOwner={user.groupMember.owner} groupId={group.id} />
      <GroupActions code={group.code} />
    </>
  )
}

export default LoggedInWithGroupScreen;