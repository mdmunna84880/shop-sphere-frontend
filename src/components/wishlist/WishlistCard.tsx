import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router'; // Updated to 'react-router'
import type { Product } from '../../types';

interface WishlistCardProps {
  product: Product;
  isInCart: boolean;
  onMoveToCart: (product: Product) => void;
  onRemove: (id: number) => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ 
  product, 
  isInCart, 
  onMoveToCart, 
  onRemove 
}) => {
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="
        group relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 
        bg-bg-surface p-4 rounded-xl 
        border border-border-base shadow-sm shadow-shadow-base
        transition-all duration-300 hover:shadow-md
      "
    >
      {/* 1. Image Thumbnail (Click to details) */}
      <Link to={`/product/${product.id}`} className="shrink-0 relative w-full sm:w-32 h-32 bg-bg-subtle rounded-lg p-2 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" 
        />
      </Link>

      {/* 2. Content Details */}
      <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-center">
        <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base sm:text-lg font-medium text-text-main line-clamp-2 hover:text-brand-primary transition-colors mb-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="text-lg font-bold text-text-main">{formattedPrice}</span>
          <span className="text-xs text-status-success font-medium bg-status-success/10 px-2 py-0.5 rounded-full">
            In Stock
          </span>
        </div>
      </div>

      {/* 3. Actions (Right Side) */}
      <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
        
        {/* ACTION 1: Add to Cart */}
        {isInCart ? (
           <Link 
             to="/cart"
             className="
               flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-40
               rounded-lg border border-status-success/30 bg-status-success/5 
               text-status-success font-semibold text-sm
               hover:bg-status-success/10 transition-colors
             "
           >
             <FiCheck className="w-4 h-4" />
             In Cart
           </Link>
        ) : (
          <button
            onClick={() => onMoveToCart(product)}
            className="
              flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-40
              rounded-lg bg-brand-primary text-text-inverse 
              font-semibold text-sm shadow-md shadow-brand-primary/20
              hover:bg-brand-hover transition-colors
            "
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}

        {/* ACTION 2: Remove (Calls removeFromWishlist) */}
        <button
          onClick={() => onRemove(Number(product.id))}
          className="
            flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-40
            rounded-lg border border-border-base bg-transparent 
            text-text-muted font-medium text-sm
            hover:border-status-error hover:text-status-error hover:bg-status-error/5 transition-all
          "
        >
          <FiTrash2 className="w-4 h-4" />
          Remove
        </button>
      </div>

    </motion.div>
  );
};