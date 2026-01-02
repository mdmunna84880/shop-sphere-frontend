import cn from "@/utils/cn";
import type React from "react";
import { FiHeart } from "react-icons/fi";

interface WishlistButtonProps{
    onToggleWishlist: (e: React.MouseEvent)=>void;
    isWishlisted: boolean;
}
function WishlistButton({onToggleWishlist, isWishlisted}:WishlistButtonProps) {
    return ( 
        <button
        onClick={onToggleWishlist}
        className={cn(
          "absolute top-3 right-3 z-20 p-3 rounded-full",
          "bg-bg-surface shadow-md hover:shadow-lg border border-border-base",
          "text-text-muted transition-all duration-300 transform hover:scale-110",
          "hover:text-status-error cursor-pointer",
          isWishlisted && "text-status-error"
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FiHeart
          className={cn(
            "w-5 h-5 transition-colors",
            isWishlisted && "fill-status-error"
          )}
        />
      </button>
     );
}

export default WishlistButton;