import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-orange-600 px-4 py-2">
      <Link href="/">
        <a className="text-l font-bold text-white">Fete Room Booker</a>
      </Link>
    </header>
  )
}

export default Header