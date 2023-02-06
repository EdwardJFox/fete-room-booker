import { ReactNode } from "react";

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  size?: 'default' | 'sm';
}

const sizeFn = (size: 'default' | 'sm' | undefined) => {
  if (size === 'sm') {
    return 'py-1 px-2 text-sm';
  } else {
    return 'py-2 px-3';
  }
}

const Button = ({ type="button", onClick, children, className, size }: ButtonProps) => {
  return (
    <button
      className={`bg-primary-300 text-primary-900 rounded-md ${sizeFn(size)} ${className}`}
      type={type}
      onClick={onClick}>
      { children }
    </button>
  )
}

export default Button;
