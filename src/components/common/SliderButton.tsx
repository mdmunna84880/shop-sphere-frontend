import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface SliderButtonProps {
  /** Direction of the navigation */
  direction: "prev" | "next";
  /** Function to trigger on click */
  onClick: () => void;
  /** Optional class overrides */
  className?: string;
}

/**
 * Shared Navigation Button for Sliders/Carousels.
 * Includes glassmorphism styles and hover effects.
 */
export default function SliderButton({
  direction,
  onClick,
  className,
}: SliderButtonProps) {
  const Icon = direction === "prev" ? FiChevronLeft : FiChevronRight;

  // Default positioning logic (can be overridden via className)
  const positionClass =
    direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4";

  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
      className={cn(
        // Layout & Position
        "flex absolute top-1/2 -translate-y-1/2 z-30",
        "p-1 sm:p-1.5 rounded-md",
        
        // Visuals (Glassmorphism)
        "bg-text-inverse/8 border border-text-inverse/5",
        "text-text-inverse backdrop-blur-md",
        
        // Animation & Interaction
        "transition-all duration-300",
        "hover:bg-brand-primary hover:text-text-inverse",
        "hover:scale-110 active:scale-95",
        
        // Visibility
        "opacity-100 md:opacity-0 md:group-hover:opacity-100",
        
        // Dynamic Position
        positionClass,
        
        // User overrides
        className
      )}
    >
      <Icon size={24} className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}