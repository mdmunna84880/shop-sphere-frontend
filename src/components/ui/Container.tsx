import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("container mx-auto px-4 w-full", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;