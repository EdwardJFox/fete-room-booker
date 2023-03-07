import { ReactNode } from "react";

export type ButtonSize = 'default' | 'sm';
export type ButtonStyle = 'default' | 'danger' | 'success';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  style?: ButtonStyle;
}

export const sizeFn = (size: 'default' | 'sm' | undefined) => {
  if (size === 'sm') {
    return 'py-1 px-2 text-sm';
  } else {
    return 'py-2 px-3';
  }
}

export const buttonStyles = {
  default: 'bg-primary-300 hover:bg-primary-400 text-primary-900',
  danger: 'bg-red-300 hover:bg-red-400 text-primary-900',
  success: 'bg-green-300 hover:bg-green-400 text-primary-900',
}

const Button = ({ type="button", onClick, children, className, size, style="default" }: ButtonProps) => {
  return (
    <button
      className={`${buttonStyles[style]} rounded-md ${sizeFn(size)} ${className}`}
      type={type}
      onClick={onClick}>
      { children }
    </button>
  )
}

export default Button;
