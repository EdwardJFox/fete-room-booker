const HomeLoggedInScreen = ({ userWithGroup }) => {
  if (userWithGroup.groupMember) {
    
  }

  return (
    <>
      <p>You're not part of any group yet, would you like to make one?</p>
      <a href="/groups/new">Create a group</a>
    </>
  )
}

export default HomeLoggedInScreen;