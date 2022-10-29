import { useState } from "react";

const GroupMembers = ({ isOwner, members, groupId }) => {
  const [currentMembers, setCurrentMembers] = useState(members);
  
  const handleRemove = (userId: number) => {
    fetch(`/api/groups/${groupId}/remove`, {
      method: "POST",
      body: JSON.stringify({
        userId
      })
    }).then(() => {
      const updatedMembers = [...currentMembers.filter((mem) => mem.userId !== userId)];
      setCurrentMembers(updatedMembers);
    })
  }

  const handleApprove = (userId: number) => {
    fetch(`/api/groups/${groupId}/approve`, {
      method: "POST",
      body: JSON.stringify({
        userId
      })
    }).then(() => {
      const updatedMembers = [...currentMembers];
      const updatedIndex = updatedMembers.findIndex((mem) => mem.userId === userId)
      updatedMembers[updatedIndex].approved = true;
      setCurrentMembers(updatedMembers);
    })
  }

  return (
    <>
      { members.map((member) =>
        <div key={member.userId}>
          { member.user.name }
          <img src={member.user.image} />

          { isOwner && !member.owner &&
            <>
              { member.approved ?
                <button onClick={() => handleRemove(member.userId)}>Remove</button>
                :
                <>
                  <button onClick={() => handleApprove(member.userId)}>Approve</button>
                  <button onClick={() => handleRemove(member.userId)}>Remove</button>
                </>
              }
            </>
          }
        </div>
      ) }
    </>
  )
}

export default GroupMembers;