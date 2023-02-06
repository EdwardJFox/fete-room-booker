import { Atkinson_Hyperlegible, Poppins } from '@next/font/google'
import { ReactNode } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Head from "next/head"

type LayoutProps = {
  children: ReactNode
}

const atkinsonsHyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`w-full h-screen flex flex-col flex-nowrap ${atkinsonsHyperlegible.className} ${poppins.className}`}>
      <Head>
        <meta name="description" content="Fete 3 - Accommodation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{ children }</Main>
      <Footer />
    </div>
  )
}

export default Layout;