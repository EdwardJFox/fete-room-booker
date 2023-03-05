import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faCopy } from '@fortawesome/free-solid-svg-icons'
import { Prisma } from "@prisma/client";
import { useState } from "react";

import useCopyToClipboard from "../../../../../hooks/useCopyToClipboard";
import GroupMemberRow from "./GroupMemberRow";

type GroupMembersProps = {
  code: string
  isOwner: boolean;
  groupId: number;
  loggedInUserId: number;
  members: Prisma.GroupMemberGetPayload<{
    include: {
      user: true;
    }
  }>[];
}

const GroupMembers = ({ isOwner, members, groupId, loggedInUserId, code }: GroupMembersProps) => {
  const [currentMembers, setCurrentMembers] = useState(members);
  const [value, copy] = useCopyToClipboard()

  const url = `${process.env.NEXT_PUBLIC_SITE_BASE_PATH}/groups/${code}`;
  
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
      <div className="flex items-center justify-between mt-3 mb-2">
        <h2 className="inline">Members</h2>
        <button onClick={() => copy(url)} className="ml-3 text-white block">
          { value ?
            <><FontAwesomeIcon icon={faCheckCircle} height={22} className="inline text-green-300" /> Copied!</>
            :
            <><FontAwesomeIcon icon={faCopy} height={22} className="inline" /> Copy join URL</>
          }
        </button>
      </div>
      { members.map((member) =>
        <GroupMemberRow
          key={member.userId}
          member={member}
          onRemove={handleRemove}
          onApprove={handleApprove}
          isOwner={isOwner}
          isSelf={member.userId === loggedInUserId} />
      ) }
    </>
  )
}

export default GroupMembers;