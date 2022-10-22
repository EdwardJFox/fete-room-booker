import { ReactNode } from "react"

type TypographyProps = {
  children: ReactNode
  className?: string
}

export const H1 = ({ children, className }: TypographyProps) => 
  <h1 className={`text-5xl ${className ? className : ""}`}>{ children }</h1>

export const H2 = ({ children, className }: TypographyProps) => 
<h1 className={`text-3xl ${className ? className : ""}`}>{ children }</h1>

export const H3 = ({ children, className }: TypographyProps) => 
<h1 className={`text-2xl ${className ? className : ""}`}>{ children }</h1>

export const H4 = ({ children, className }: TypographyProps) => 
<h1 className={`text-1xl ${className ? className : ""}`}>{ children }</h1>

export const P = ({ children, className }: TypographyProps) => 
<h1 className={`text-m ${className ? className : ""}`}>{ children }</h1>