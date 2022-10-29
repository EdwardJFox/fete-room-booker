import { ReactNode } from "react";

type TableComponentProps = {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableComponentProps) => {
  return (
    <table className={`${className ? className : ""}`}>{ children }</table>
  )
}

export const THead = ({ children, className }: TableComponentProps) => {
  return (
    <thead className={`${className ? className : ""}`}>{ children }</thead>
  )
}

export const TBody = ({ children, className }: TableComponentProps) => {
  return (
    <tbody className={`${className ? className : ""}`}>{ children }</tbody>
  )
}

export const TR = ({ children, className }: TableComponentProps) => {
  return (
    <tr className={`${className ? className : ""}`}>{ children }</tr>
  )
}

export const TD = ({ children, className }: TableComponentProps) => {
  return (
    <td className={`${className ? className : ""}`}>{ children }</td>
  )
}

export const TH = ({ children, className }: TableComponentProps) => {
  return (
    <th className={`${className ? className : ""}`}>{ children }</th>
  )
}