import { ReactNode } from "react";

type InfoMessageProps = {
  style: 'success' | 'danger';
  className?: string;
  children: ReactNode;
}

const InfoMessage = ({ style, className, children }: InfoMessageProps) => {
  return (
    <p className={`border-${ style === 'danger' ? 'red' : 'green' }-400 border-2 text-white rounded-md p-4 text-center ${className || ''}`}>{ children }</p>
  )
}

export default InfoMessage;
