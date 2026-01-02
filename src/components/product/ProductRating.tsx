import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { cn } from "@/utils/cn";

interface ProductRatingProps {
  rate: number;
  count: number;
  className?: string;
}

export const ProductRating = ({ rate, count, className }: ProductRatingProps) => {
  // Logic to render 5 stars based on the rate
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        // Full Star
        stars.push(<FaStar key={i} className="text-yellow-400 w-3.5 h-3.5" />);
      } else if (rate >= i - 0.5) {
        // Half Star
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-3.5 h-3.5" />);
      } else {
        // Empty Star
        stars.push(<FaRegStar key={i} className="text-text-muted/40 w-3.5 h-3.5" />);
      }
    }
    return stars;
  };

  return (
    <div className={cn("flex items-center gap-2 mb-3", className)}>
      {/* Dynamic Star Row */}
      <div className="flex gap-0.5">
        {renderStars()}
      </div>

      {/* Numeric Rating & Count */}
      <span className="text-xs text-text-muted font-medium ml-1">
         {rate} <span className="text-text-muted/60">({count.toLocaleString()})</span>
      </span>
    </div>
  );
};