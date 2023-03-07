import Link from "next/link";
import { ReactNode } from "react";
import { ButtonSize, ButtonStyle, buttonStyles, sizeFn } from ".";

type ButtonLink = {
  href: string;
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  style?: ButtonStyle;
}

const ButtonLink = ({ href, children, className, size='default', style="default" }: ButtonLink) => {
  return (
    <Link
      href={href}
      className={`${buttonStyles[style]} rounded-md ${sizeFn(size)} ${className}`}
    >
      { children }
    </Link>
  )
}

export default ButtonLink;
