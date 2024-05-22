import type { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return <button className={className}>{children}</button>;
};
