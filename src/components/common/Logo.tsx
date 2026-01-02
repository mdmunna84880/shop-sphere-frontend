import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router";
import { cn } from "@/utils/cn";
import type { JSX } from "react";

interface LogoProps {
  /** Optional additional classes for the root element */
  className?: string;
}

/**
 * Main Brand Logo Component.
 * Displays the ShopSphere icon and text.
 *
 * @param className - Allows overriding or adding styles (e.g., margins)
 */
const Logo = ({ className }: LogoProps): JSX.Element => {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center gap-2.5 select-none group cursor-pointer",
        className
      )}
      aria-label="Go to Homepage"
    >
      {/* Icon Container */}
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10",
          "bg-brand-primary rounded-xl",
          "shadow-lg shadow-brand-primary/20",
          "transition-all duration-300 ease-out",
          "group-hover:bg-brand-hover group-hover:scale-105 group-hover:rotate-3"
        )}
      >
        <FaShoppingBag className="text-text-inverse text-lg drop-shadow-sm" />
      </div>

      {/* Brand Text */}
      <div className="font-logo font-bold text-xl tracking-tight leading-none">
        <span className="text-text-main transition-colors duration-300">
          Shop
        </span>
        <span className="text-brand-primary group-hover:text-brand-hover transition-colors duration-300">
          Sphere
        </span>
      </div>
    </Link>
  );
};

export default Logo;