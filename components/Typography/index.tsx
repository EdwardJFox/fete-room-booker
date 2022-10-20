import { ReactNode } from "react"

type TypographyProps = {
  children: ReactNode
}

export const H1 = ({ children }: TypographyProps) => 
  <h1 className="text-5xl">{ children }</h1>