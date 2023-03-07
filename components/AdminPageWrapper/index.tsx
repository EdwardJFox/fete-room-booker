import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

const AdminPageWrapper = ({ children }: { children: ReactNode }): ReactElement => {
  const router = useRouter()

  const session = useSession()

  if (!session?.data?.user.admin) {
    router.push("/");

    return <></>;
  }

  return <>{children}</>;
}

export default AdminPageWrapper;