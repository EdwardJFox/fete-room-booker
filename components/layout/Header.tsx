import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {
  const session = useSession();

  return (
    <header className="border-b-2 border-secondary-400 px-4 py-3">
      <Link href="/" className="text-l text-white">
        Fete 3 Accommodation Organiser
      </Link>
      { session && session.status === "authenticated" &&
        <>
          { session?.data?.user?.name && <p>{ session?.data?.user?.name }</p> }
          <button onClick={() => signOut()}>Sign out</button>
        </>
      }
    </header>
  );
}

export default Header