import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { cn } from "@/utils/cn";

// Sub-components
import { ProductBadge } from "./ProductBadge";
import { ProductPrice } from "./ProductPrice";
import { ProductRating } from "./ProductRating";
import { ProductActions } from "./ProductActions";

// Types
import type { Product } from "@/types/product.types";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
  isInCart?: boolean;
  onAddToCart?: (id: number | string) => void;
  onToggleWishlist?: (id: number | string) => void;
  isWishlistedInitial?: boolean;
}

export const ProductCard = ({
  product,
  isInCart = false,
  onAddToCart,
  onToggleWishlist,
  isWishlistedInitial = false,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedInitial);

  // Client-side discount logic (Default to 20% since API doesn't provide it)
  const discountValue = 20;

  // --- Handlers ---

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product.id);
  };

  const handleBuyNow = () => {
    navigate("/pay");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  // --- Render ---

  return (
    <div
      className={cn(
        "group relative w-full max-w-75",
        "bg-bg-surface rounded-xl border border-border-base",
        "shadow-sm shadow-shadow-base",
        "hover:shadow-lg hover:-translate-y-1",
        "transition-all duration-300",
        "flex flex-col overflow-hidden"
      )}
    >
      {/* 1. Image Section (Clickable) */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full overflow-hidden aspect-square bg-bg-subtle p-4"
      >
        {/* Discount Badge: Passing the local value */}
        <ProductBadge discount={discountValue} />

        {/* Wishlist Button */}
        <WishlistButton isWishlisted={isWishlisted} onToggleWishlist={handleWishlist} />

        {/* Product Image */}
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="object-contain w-full h-full transition-transform duration-500 mix-blend-multiply scale-95 group-hover:scale-100"
          />
        </div>
      </Link>

      {/* 2. Content Section */}
      <div className="flex flex-col grow p-4">
        <span className="mb-1 text-xs font-medium tracking-wider uppercase text-text-muted">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3
            className="mb-2 text-sm font-medium transition-colors leading-snug text-text-main line-clamp-2 group-hover:text-brand-primary"
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>

        <ProductRating 
          rate={product.rating.rate} 
          count={product.rating.count} 
        />

        {/* Price: Passing the local discount value to calculate original price */}
        <ProductPrice 
          price={product.price} 
          discount={discountValue} 
        />

        <ProductActions
          isInCart={isInCart}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onGoToCart={handleGoToCart}
        />
      </div>
    </div>
  );
};