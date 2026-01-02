import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon to display on the left side */
  startIcon?: React.ReactNode;
  /** Icon or element to display on the right side (e.g., Clear button) */
  endIcon?: React.ReactNode;
  /** Class for the wrapping div (border, background) */
  containerClassName?: string;
  /**Ref of input for the focus and controlling the input-dom */
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input = (
    { className, containerClassName, startIcon, endIcon, disabled, ref, ...props }:InputProps
  ) => {
    return (
      <div
        className={cn(
          // Base Layout
          "flex items-center w-full",
          "rounded-xl px-2 py-1.5",
          "transition-all duration-300 group",
          
          // Colors & Borders
          "bg-bg-subtle border border-transparent",
          
          // Focus State (The parent div shows focus ring)
          "focus-within:bg-bg-surface",
          "focus-within:border-brand-primary/30",
          "focus-within:ring-4 focus-within:ring-brand-primary/10",

          // Making group to style their children
          "group",

          // Disabled State
          disabled && "opacity-50 cursor-not-allowed",
          
          containerClassName
        )}
      >
        {/* Start Icon */}
        {startIcon && (
          <div className="mr-2 text-text-muted shrink-0 flex items-center justify-center group-focus-within:text-brand-primary/40">
            {startIcon}
          </div>
        )}

        {/* Actual Input Field */}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent outline-none",
            "font-body font-medium text-text-main",
            "placeholder-text-muted",
            "min-w-0 h-full py-1",
            className
          )}
          {...props}
        />

        {/* End Icon */}
        {endIcon && (
          <div className="ml-2 flex items-center justify-center gap-1">
            {endIcon}
          </div>
        )}
      </div>
    );
  }

export default Input;