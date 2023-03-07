import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const LoggedInPageWrapper = ({ children }: { children: ReactElement }): ReactElement => {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/")
    },
  })
  
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  return children;
}

export default LoggedInPageWrapper;