/** @format */

import cn from "@/utils/cn";
import type { ButtonHTMLAttributes } from "react";

function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap capitalize transition-all border scale-95 hover:scale-100 active:scale-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
