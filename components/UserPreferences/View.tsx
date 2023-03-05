import { Preference } from "@prisma/client"

type UserPreferencesViewProps = {
  preferences: Preference;
}

const UserPreferencesView = ({ preferences }: UserPreferencesViewProps) => {
  if (!preferences) {
    return (
      <>
        <h2>Preferences</h2>
        <p>User has not yet set their preferences.</p>
      </>
    )
  }

  return (
    <>
      <h2>Preferences</h2>
      <p><b>Room Type:</b> { preferences?.typeOfRoom ?  preferences?.typeOfRoom : '-' }</p>
      <p><b>Dietary:</b> { preferences?.dietary ?  preferences?.dietary : '-' }</p>
      <p><b>Comments:</b> { preferences?.comments ?  preferences?.comments : '-' }</p>
    </>
  )
}

export default UserPreferencesView;
