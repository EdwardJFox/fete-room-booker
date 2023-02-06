import { ReactNode } from "react";

type ButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Button = ({ type="button", onClick, children, className }: ButtonProps) => {
  return (
    <button
      className={`bg-primary-300 text-primary-900 py-2 px-3 rounded-md ${className}`}
      type={type}
      onClick={onClick}>
      { children }
    </button>
  )
}

export default Button;
