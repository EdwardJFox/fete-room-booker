import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link"
import Button from "../Button";

const Header = () => {
  const session = useSession();

  return (
    <header className="border-b-2 border-secondary-400 px-4 py-3 flex justify-between content-center">
      <Link href="/" className="text-l text-white">
        <Image
          src="/fete3_logo.png"
          alt="Fete 3 Logo"
          width={36}
          height={36}
          className="mx-auto inline-block"
        />
        <span className="pl-3">Fete 3</span>
      </Link>
      <span className="flex items-center">
        { session && session.status === "authenticated" &&
          <>
            { session?.data?.user?.name && <p className="pr-3">{ session?.data?.user?.name }</p> }
            <Button onClick={() => signOut()} size="sm">Sign out</Button>
          </>
        }
      </span>
    </header>
  );
}

export default Header