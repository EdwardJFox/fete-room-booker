import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from '../../../../Button';

type GroupMemberProps = {
  member: Prisma.GroupMemberGetPayload<{
    include: {
      user: true;
    }
  }>;
  isOwner: boolean;
  isSelf: boolean;
  onApprove: (id: number) => void;
  onRemove: (id: number) => void;
}

const GroupMember = ({ member, onRemove, onApprove, isOwner, isSelf }: GroupMemberProps) => {
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
    <div className="flex p-3 mb-2 bg-secondary-600 rounded-md items-center">
      <div className="flex-initial relative">
        <Image
          src={member.user.image || "/default_avatar.png"}
          alt={`${member.user.name} avatar`}
          width={54}
          height={54}
          className="overflow-hidden rounded-full border-4 border-white" />
        { member.owner &&
          <div className="absolute -bottom-1 mx-auto px-1 text-sm bg-primary-200 text-primary-900 rounded-md">
            Owner
          </div>
        }
        { isSelf && !member.owner &&
          <div className="absolute -bottom-1 mx-auto px-1 text-sm bg-green-200 text-primary-900 rounded-md">
            You
          </div>
        }
      </div>
      <div className="flex-1 px-3">
        <p>
          { member.user.name }
        </p>
      </div>

      <div className="flex-initial">
        { isSelf && !isOwner &&
          <Button size="sm" style="danger" onClick={removeSelfFromGroup}>Remove Myself</Button>
        }
        { isOwner && !member.owner &&
          <>
            { !member.approved && <Button size="sm" style="success" className="mr-2" onClick={() => onApprove(member.userId)}>Approve</Button> }
            <Button size="sm" style="danger" onClick={() => onRemove(member.userId)}>Remove</Button>
          </>
        }
      </div>
    </div>
  )
}

export default GroupMember;
