import { type IconType } from "react-icons";
import { cn } from "@/utils/cn";

interface IconBadgeProps {
  /** The icon component to render (from react-icons) */
  icon: IconType;
  /** Tooltip/Title for accessibility and hover */
  title?: string;
  /** Number to display in the cart/wishlist badge */
  count?: number;
  /** Optional class for the Icon SVG itself */
  iconClassName?: string;
  /** Optional class for the wrapper div */
  className?: string;
}

/**
 * A shared utility component that renders an Icon with an optional numeric badge.
 * Used for Cart, Wishlist, and Notifications.
 */
export default function IconBadge({
  icon: Icon,
  title,
  count = 0,
  iconClassName,
  className,
}: IconBadgeProps) {
  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center", 
        className
      )}
    >
      {/* The Main Icon */}
      <Icon 
        className={iconClassName} 
        aria-hidden="true" 
      />
      
      {/* The Notification Badge */}
      {count > 0 && (
        <span
          className={cn(
            "absolute -top-2 -right-2",
            "flex items-center justify-center",
            "min-w-4.5 h-4.5 px-1",
            "text-[10px] font-bold leading-none",
            "text-text-inverse bg-brand-accent",
            "rounded-md shadow-sm ring-1 ring-white",
            "pointer-events-none"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
      
      {/*Screen Reader Only Label */}
      {<span className="sr-only">{title}</span>}
    </div>
  );
}