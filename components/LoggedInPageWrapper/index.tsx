import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const LoggedInPageWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login")
    },
  })
  
  if (status === "loading") {
    return "Loading...";
  }
  
  return children;
}

export default LoggedInPageWrapper;