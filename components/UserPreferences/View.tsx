import { Preference } from "@prisma/client"

type UserPreferencesViewProps = {
  preferences: Preference | null;
}

const UserPreferencesView = ({ preferences }: UserPreferencesViewProps) => {
  if (!preferences) {
    return (
      <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
        <h2>Preferences</h2>
        <p>No preferences set.</p>
      </div>
    )
  }

  return (
    <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
      <h2 className="mb-2">Preferences</h2>
      <p className="mb-1"><b>Room Type:</b> { preferences?.typeOfRoom ?  preferences?.typeOfRoom : '-' }</p>
      <p><b>Comments:</b> { preferences?.comments ?  preferences?.comments : '-' }</p>
    </div>
  )
}

export default UserPreferencesView;
