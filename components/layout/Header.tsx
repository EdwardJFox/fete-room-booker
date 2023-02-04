import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { P } from "../Typography";

const Header = () => {
  const session = useSession();

  return (
    <header className="bg-orange-600 px-4 py-2">
      <Link href="/" className="text-l font-bold text-white">
        Fete Room Booker
      </Link>
      { session && session.status === "authenticated" &&
        <>
          { session?.data?.user?.name && <P>{ session?.data?.user?.name }</P> }
          <button onClick={() => signOut()}>Sign out</button>
        </>
      }
    </header>
  );
}

export default Header