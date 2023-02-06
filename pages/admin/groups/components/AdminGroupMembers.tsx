import { useRouter } from "next/router";
import { useState } from "react";
import TextField from "../../../../components/form/TextField";
import { Table, THead, TBody, TR, TH, TD } from "../../../../components/Table";

const AdminGroupMembers = ({ members, setMembers }) => {
  const router = useRouter();
  const { id } = router.query;
  const [addingNewMember, setAddingNewMember] = useState(false);
  const [newUsersEmail, setNewUsersEmail] = useState("");
  const [newUserError, setNewUserError] = useState(null);

  const removeGroupMember = (index, member) => {
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
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("Not found")
      }
    }).then(({ member }) => {
      const newMembers = [...members];
      newMembers.push(member);
      setMembers(newMembers);
      setAddingNewMember(false)
      setNewUsersEmail("")
      setNewUserError(null)
    }).catch((err) => {
      setNewUserError("Not found!")
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
      <Table>
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
            <TR key={member.userId}>
              <TD>{ member.user.name }</TD>
              <TD>{ member.user.email }</TD>
              <TD>{ member.approved ? "Yes" : "No" }</TD>
              <TD>{ member.owner ? "Yes" : "No" }</TD>
              <TD>
                { !member.approved && <button onClick={() => approveGroupMember(index, member)}>Approve</button> }
                <button onClick={() => toggleOwner(index, member)}>{ member.owner ? "Remove owner" : "Set as an owner" }</button>
                <button onClick={() => removeGroupMember(index, member)}>Remove</button>
              </TD>
            </TR>
          )}
        </TBody>
      </Table>
      { !addingNewMember && <button onClick={() => setAddingNewMember(true)}>Add new member</button> }
      { addingNewMember && <>
        <TextField
          name="email"
          label="New users email"
          value={newUsersEmail}
          onChange={(value) => setNewUsersEmail(value)} />          
        {newUserError && <p>{ newUserError }</p>}
        <button onClick={addNewGroupMember}>Save member</button>
      </>}
    </>
  )
}

export default AdminGroupMembers;