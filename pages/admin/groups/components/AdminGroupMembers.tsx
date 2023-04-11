import { Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "components/Button";
import TextField from "components/form/TextField";
import InfoMessage from "components/InfoMessage";
import { Table, THead, TBody, TR, TH, TD } from "components/Table";

type Member = Prisma.GroupMemberGetPayload<{
  include: {
    user: {
      select: {
        name: true,
        email: true,
        image: true
      }
    }
  }
}>;

type AdminGroupMembersProps = {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

const AdminGroupMembers = ({ members, setMembers }: AdminGroupMembersProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [addingNewMember, setAddingNewMember] = useState(false);
  const [newUsersEmail, setNewUsersEmail] = useState("");
  const [newUserError, setNewUserError] = useState<null | string>(null);

  const removeGroupMember = (index: number, member: Member) => {
    if (confirm(`Are you sure you want to remove ${member.user.name} from this group?`)) {
      fetch(`/api/admin/group_members/${member.userId}`, {
        method: "DELETE"
      }).then((res) => {
        if (res.status === 200) {
          const newMembers = [...members];
          newMembers.splice(index, 1);
          setMembers(newMembers);
        }
      })
    }
  }

  const addNewGroupMember = () => {
    fetch("/api/admin/group_members", {
      method: "POST",
      body: JSON.stringify({
        groupId: id,
        email: newUsersEmail
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(({ error }) => { throw new Error(error) });
      }
    }).then(({ member }) => {
      const newMembers = [...members];
      newMembers.push(member);
      setMembers(newMembers);
      setAddingNewMember(false);
      setNewUsersEmail("");
      setNewUserError(null);
    }).catch((err) => {
      setNewUserError(err.message);
    })
  }

  const approveGroupMember = (index: number, member: any) => {
    fetch(`/api/admin/group_members/${member.userId}/approve`, {
      method: "PATCH",
      body: JSON.stringify({
        groupId: id,
      })
    }).then((res) => {
      if (res.status === 200) {
        const newMembers = [...members];
        newMembers[index].approved = true;
        setMembers(newMembers);
      }
    })
  }

  const toggleOwner = (index: number, member: any) => {
    fetch(`/api/admin/group_members/${member.userId}/owner`, {
      method: "PATCH",
      body: JSON.stringify({
        groupId: id,
        owner: !member.owner
      })
    }).then((res) => {
      if (res.status === 200) {
        const newMembers = [...members];
        newMembers[index].owner = !member.owner;
        setMembers(newMembers);
      }
    })
  }

  return (
    <>
      <h3 className="text-2xl">Group Members</h3>
      { members?.length > 0 ?
        <Table className="text-white mt-3 mb-5">
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Approved</TH>
              <TH>Owner</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            { members.map((member, index) =>
              <TR key={member.userId} className="odd:bg-secondary-400">
                <TD>{ member.user.name }</TD>
                <TD>{ member.user.email }</TD>
                <TD>{ member.approved ? "Yes" : "No" }</TD>
                <TD>{ member.owner ? "Yes" : "No" }</TD>
                <TD className="text-right">
                  { !member.approved && <Button size="sm" style="success" className="mr-2" onClick={() => approveGroupMember(index, member)}>Approve</Button> }
                  { member.approved && <Button size="sm" className="mr-2" onClick={() => toggleOwner(index, member)}>{ member.owner ? "Remove owner" : "Make owner" }</Button> }
                  <Button size="sm" style="danger" onClick={() => removeGroupMember(index, member)}>Remove</Button>
                </TD>
              </TR>
            )}
          </TBody>
        </Table>
        :
        <p className="text-white my-4">No members found!</p>
      }
      { !addingNewMember && <Button onClick={() => setAddingNewMember(true)} className="mr-3">Add new member</Button> }
      { addingNewMember && <>
        <TextField
          className="mb-3"
          name="email"
          label="New users email"
          value={newUsersEmail}
          onChange={(value) => setNewUsersEmail(value)} />          
        { newUserError && <InfoMessage style="danger" className="mb-3">{ newUserError }</InfoMessage> }
        <Button onClick={addNewGroupMember} className="mr-3">Save member</Button>
      </>}
    </>
  )
}

export default AdminGroupMembers;