import { ReactNode } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col flex-nowrap">
      <Header />
      <Main>{ children }</Main>
      <Footer />
    </div>
  )
}

export default Layout;