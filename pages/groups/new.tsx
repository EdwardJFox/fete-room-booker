import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextField from '../../components/form/TextField';
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper';

const GroupsNew: NextPage = () => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState([]);
  const router = useRouter()

  const submitNewGroup = () => {
    fetch("/api/groups/new", {
      method: "POST",
      body: JSON.stringify({
        groupName
      })
    }).then(() => {
      router.push("/groups")
    }).catch((err) => {
      setError(err);
    })
  }

  return (
    <ProtectedPageWrapper>
      <Head>
        <title>Create Group</title>
      </Head>
      
      <p>Creating a group will allow you to organise your accommodation with your friends at Fete 3!</p>
      <TextField
        value={groupName}
        label="Group Name"
        name="groupName"
        onChange={(value) => setGroupName(value)} />
      <button onClick={submitNewGroup}>Create new group</button>
      { error && <p>{ error }</p>}
    </ProtectedPageWrapper>
  )
}

export default GroupsNew
