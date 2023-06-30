import { Preference } from "@prisma/client";
import { useRouter } from "next/router";
import Button from "../../../../Button";
import UserPreferencesView from "components/UserPreferences/View";

type PendingProps = {
  preferences: Preference | null;
  groupName: string;
}

const Pending = ({ preferences, groupName }: PendingProps) => {
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
    <div className="max-w-2xl mx-2 sm:mx-auto">
      <div className="p-6 bg-secondary-600 rounded-md mt-4">
        <p>Your join request to { groupName } is now pending.</p>
        <Button className="mt-3" style="danger" onClick={removeSelfFromGroup}>Cancel request</Button>
      </div>
      <UserPreferencesView preferences={preferences} />
    </div>
  );
}

export default Pending;