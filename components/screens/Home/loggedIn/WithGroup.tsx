import UserPreferencesForm from "../../../UserPreferences/Form";
import GroupActions from "./components/GroupActions";
import GroupMembers from "./components/GroupMembers";

// Default screen for showing the group you are in and its details
const LoggedInWithGroupScreen = ({ user, group }) => {
  if (!user.groupMember.approved) {
    return <p>Your join request to { group.name } is pending!</p>
  }

  return (
    <>
      <h1>{ group.name }</h1>
      <GroupMembers members={group.members} isOwner={user.groupMember.owner} groupId={group.id} />
      <GroupActions code={group.code} />
      <UserPreferencesForm preferences={user.preferences} />
    </>
  )
}

export default LoggedInWithGroupScreen;