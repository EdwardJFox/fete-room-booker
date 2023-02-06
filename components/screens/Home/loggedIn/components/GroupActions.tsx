import { useRouter } from "next/router"
import Input from "../../../../form/Input";

const GroupActions = ({ code }) => {
  const router = useRouter();

  const removeSelfFromGroup = () => {
    const response = confirm("Are you sure you want to remove yourself from this group? You will need to be re-accepted to re-join.");

    if (response) {
      fetch("/api/groups/remove_myself", {
        method: "DELETE"
      }).then(() => {
        router.push("/");
      })
    }
  }

  return (
    <>
      <button onClick={removeSelfFromGroup}>Remove Myself from group</button>
      <p>To invite people to this group, send them the link below:</p>
      <Input value={`http://localhost:3000/groups/${code}`} name="groupCode" disabled />
    </>    
  )
}

export default GroupActions;