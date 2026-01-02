import { cn } from "@/utils/cn";

interface ProductBadgeProps {
  discount?: number;
  className?: string;
}

/**
 * Displays the "XX% OFF" badge on the product image.
 * Default discount is 20% if not provided (simulating a sale).
 */
export const ProductBadge = ({ discount = 20, className }: ProductBadgeProps) => {
  // If discount is 0 or less, don't render anything
  if (discount <= 0) return null;

  return (
    <div
      className={cn(
        "absolute top-3 left-3 z-10",
        "bg-status-success text-text-inverse",
        "text-[10px] font-bold px-2 py-1",
        "rounded-sm uppercase tracking-wide",
        className
      )}
    >
      {discount}% OFF
    </div>
  );
};