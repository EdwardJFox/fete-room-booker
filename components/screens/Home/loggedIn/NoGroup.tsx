import { useRouter } from "next/router";
import { useState } from "react";
import TextField from "../../../form/TextField";

const LoggedInNoGroupScreen = () => {
  const router = useRouter()
  const [code, setCode] = useState(router.query.code || "");
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState<null | string>();

  const submitNewGroup = () => {
    fetch("/api/groups/new", {
      method: "POST",
      body: JSON.stringify({
        groupName
      })
    }).then(() => {
      router.push("/")
    }).catch((err) => {
      setError(err);
    })
  }

  const joinGroup = () => {
    fetch("/api/groups/join", {
      method: "POST",
      body: JSON.stringify({
        code
      })
    }).then((res) => {
      if (res.status === 201) {
        router.push("/")
      } else {
        setError("Something went wrong")
      }
    }).catch((err) => {
      setError(err);
    })
  }

  return (
    <>
      <p>If you have the code, you can join a group:</p>
      <TextField
        value={code}
        label="Code"
        name="code"
        onChange={(value) => setCode(value)} />
      <button onClick={joinGroup}>Join Group</button>
      <hr />
      <p>You're not part of any group yet, you can make one below!</p>
      <p>Creating a group will allow you to organise your accommodation with your friends at Fete 3!</p>
      <TextField
        value={groupName}
        label="Group Name"
        name="groupName"
        onChange={(value) => setGroupName(value)} />
      <button onClick={submitNewGroup}>Create new group</button>
      { error && <p>{ error }</p>}
    </>
  )
}

export default LoggedInNoGroupScreen;