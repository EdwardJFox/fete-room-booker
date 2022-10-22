import { ReactNode } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Head from "next/head"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col flex-nowrap">
      <Head>
        <meta name="description" content="Roombooker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{ children }</Main>
      <Footer />
    </div>
  )
}

export default Layout;