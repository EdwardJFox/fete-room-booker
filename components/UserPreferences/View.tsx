const UserPreferencesView = ({ preferences }) => {
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
    </>
  )
}

export default UserPreferencesView;
