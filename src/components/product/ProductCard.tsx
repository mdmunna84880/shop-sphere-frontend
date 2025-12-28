import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiZap, FiHeart, FiStar, FiCheck} from 'react-icons/fi'; // Added Icons
import { Link, useNavigate } from 'react-router'; // Import Link & useNavigate
import { clsx } from 'clsx'; 
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface Product {
  id: number | string;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  isInCart?: boolean; // <--- NEW PROP
  onAddToCart?: (id: number | string) => void;
  onToggleWishlist?: (id: number | string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isInCart = false, // Default to false
  onAddToCart, 
  onToggleWishlist 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const discountPercent = product.discount || 20; 
  const originalPrice = product.price / (1 - discountPercent / 100);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(originalPrice);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product.id);
  };

  // Function to handle "Buy Now" - Adds to cart then goes to checkout/cart
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isInCart) {
        onAddToCart?.(product.id);
    }
    navigate('/cart');
  };

  return (
    <div className="
      group relative w-full max-w-[300px] 
      bg-bg-surface 
      rounded-xl border border-border-base 
      shadow-sm shadow-shadow-base 
      hover:shadow-lg hover:-translate-y-1
      transition-all duration-300 
      flex flex-col overflow-hidden
    ">
      
      {/* --- Image Section (Clickable -> Details Page) --- */}
      <Link to={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-bg-subtle p-4 overflow-hidden block">
        
        {/* Wishlist Icon */}
        <button
          onClick={handleWishlist}
          className="
            absolute top-3 right-3 z-10 p-2 rounded-full 
            bg-bg-surface/80 backdrop-blur-sm 
            text-text-muted 
            hover:text-status-error hover:bg-bg-surface 
            transition-colors shadow-sm
          "
        >
          <FiHeart className={cn("w-5 h-5", isWishlisted && "fill-status-error text-status-error")} />
        </button>

        {/* Discount Badge */}
        <div className="
          absolute top-3 left-3 z-10 
          bg-status-success text-text-inverse 
          text-[10px] font-bold px-2 py-1 
          rounded-sm uppercase tracking-wide
        ">
          {discountPercent}% OFF
        </div>

        {/* Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="
              w-full h-full object-contain mix-blend-multiply 
              transition-transform duration-500 group-hover:scale-110
            "
          />
        </div>
      </Link>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow p-4">
        
        <span className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Title (Clickable -> Details Page) */}
        <Link to={`/product/${product.id}`}>
          <h3 
            className="
              text-sm font-medium text-text-main 
              leading-snug line-clamp-2 mb-2 
              group-hover:text-brand-primary transition-colors
            "
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="
            flex items-center 
            bg-status-success/10 text-status-success 
            px-1.5 py-0.5 rounded text-xs font-bold
          ">
            {product.rating.rate} <FiStar className="w-3 h-3 ml-1 fill-current" />
          </div>
          <span className="text-xs text-text-muted font-medium">
            ({product.rating.count.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price Row */}
        <div className="mt-auto mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-main">
              {formattedPrice}
            </span>
            <span className="text-sm text-text-muted line-through decoration-text-muted">
              {formattedOriginalPrice}
            </span>
          </div>
          <p className="text-xs text-status-success font-semibold mt-0.5">
            Free Delivery by Tomorrow
          </p>
        </div>

        {/* --- Buttons (Action Area) --- */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          
          {/* Smart Cart Button: Toggles between "Cart" and "Go to Cart" */}
          {isInCart ? (
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cart')} // <--- Go to Cart
              className="
                flex items-center justify-center gap-2 px-3 py-2.5 
                rounded-lg border border-status-success/20 
                bg-status-success/10 text-status-success 
                font-semibold text-sm 
                hover:bg-status-success/20 transition-colors
              "
            >
              <FiCheck className="w-4 h-4" />
              Go to Cart
            </motion.button>
          ) : (
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product.id);
              }}
              className="
                flex items-center justify-center gap-2 px-3 py-2.5 
                rounded-lg border border-brand-primary/20 
                bg-bg-subtle text-brand-primary 
                font-semibold text-sm 
                hover:bg-brand-primary/5 transition-colors
              "
            >
              <FiShoppingCart className="w-4 h-4" />
              Cart
            </motion.button>
          )}

          {/* Buy Now (Primary) */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className="
              flex items-center justify-center gap-2 px-3 py-2.5 
              rounded-lg 
              bg-brand-accent text-text-inverse 
              font-semibold text-sm shadow-md shadow-brand-accent/20 
              hover:bg-brand-accent-hover transition-colors
            "
          >
            <FiZap className="w-4 h-4 fill-current" />
            Buy Now
          </motion.button>
        </div>

      </div>
    </div>
  );
};