import { ReactNode } from "react"

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="flex-grow container mx-auto">
      { children }
    </main>
  )
}

export default Main;