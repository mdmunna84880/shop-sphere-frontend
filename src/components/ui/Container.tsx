import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

/**
 * Global Layout Container.
 * Centers content horizontally and provides consistent horizontal padding.
 * Use this wrapper for almost all page sections to ensure alignment.
 */
function Container({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container mx-auto w-full px-4 sm:px-6 lg:px-8", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;