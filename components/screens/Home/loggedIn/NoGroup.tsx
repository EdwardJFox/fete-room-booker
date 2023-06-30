import { Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../../Button";
import TextField from "../../../form/TextField";
import TravelInfo from "components/TravelInfo";
import UserPreferencesView from "components/UserPreferences/View";

type LoggedInNoGroupScreenProps = {
  user: Prisma.UserGetPayload<{
    include: {
      preferences: true,
      travel: {
        include: {
          to: true,
          from: true
        }
      }
    }
  }>;
}

const LoggedInNoGroupScreen = ({ user }: LoggedInNoGroupScreenProps) => {
  const router = useRouter()
  const [code, setCode] = useState(router.query.code as string || "");
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
    <div className="max-w-2xl mx-2 sm:mx-auto">
      <div className="py-5 px-8 my-4 bg-secondary-600 rounded-md">
        <h1>Signup and room allocation has now ended!</h1>
        <p className="mt-2">For any last minute changes, contact the Fete team.</p>
      </div>
      {/* <div className="py-3 px-4 my-4 bg-secondary-600 rounded-md">
        <h2 className="mb-3">Join a group</h2>
        <p>If you have the code, you can join a group:</p>
        <div className="flex items-end mt-3">
          <TextField
            className="flex-1"
            value={code}
            label="Code"
            name="code"
            onChange={(value) => setCode(value)} />
          <Button className="flex-initial ml-3" onClick={joinGroup}>Join Group</Button>
        </div>
      </div> */}

      {/* <div className="py-3 px-4 bg-secondary-600 rounded-md">
        <h2 className="mb-3">Start a new group</h2>
        <p>Creating a group will allow you to organise your accommodation with your friends at Fete 3!</p>
        <div className="md:flex md:items-end mt-3">
          <TextField
            className="flex-1"
            value={groupName}
            label="Group Name (Max 30 characters)"
            name="groupName"
            onChange={(value) => setGroupName(value)}
            max={32} />
          <Button
            className="flex-initial w-full mt-2 md:ml-3 md:mt- md:w-auto"
            onClick={submitNewGroup}
            disabled={groupName.length === 0}
          >
            Create new group
          </Button>
        </div>
        { error && <p>{ error }</p>}
      </div> */}
      <UserPreferencesView preferences={user.preferences} />
      <TravelInfo travel={user.travel} />
    </div>
  )
}

export default LoggedInNoGroupScreen;