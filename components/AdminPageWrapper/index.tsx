import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const AdminPageWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const session = useSession()

  if (!session?.data?.user.admin) {
    router.push("/");
  }

  return children;
}

export default AdminPageWrapper;