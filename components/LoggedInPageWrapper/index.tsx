import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const LoggedInPageWrapper = ({ children }: { children: ReactNode }) => {
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