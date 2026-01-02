import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiTrash2, FiShoppingCart, FiCheck } from 'react-icons/fi'; // Removed FiStar as it's in the component now
import { cn } from '@/utils/cn';
import type { Product } from '@/types/product.types';

import { ProductRating } from '@/components/product/ProductRating';

interface WishlistCardProps {
  product: Product;
  isInCart: boolean;
  onMoveToCart: (product: Product) => void;
  onRemove: (id: number) => void;
}

export const WishlistCard = ({ product, isInCart, onMoveToCart, onRemove }: WishlistCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col max-w-2xl sm:flex-row gap-4 sm:gap-6 p-4 bg-bg-surface border border-border-base rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 1. Image Section */}
      <Link 
        to={`/product/${product.id}`} 
        className="w-full sm:w-32 h-32 sm:h-32 bg-bg-subtle rounded-lg p-4 flex items-center justify-center shrink-0"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" 
        />
      </Link>

      {/* 2. Content Section */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-base sm:text-lg font-bold text-text-main leading-tight hover:text-brand-primary transition-colors line-clamp-1">
                  {product.title}
                </h3>
              </Link>
            </div>
          </div>

          {/* REUSED COMPONENT: ProductRating */}
          <div className="mt-2">
            <ProductRating 
              rate={product.rating.rate} 
              count={product.rating.count} 
              className="mb-0"
            />
          </div>

          <div className="mt-3">
            <span className="text-xl font-bold text-text-main font-heading">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 3. Actions Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
          
          {/* Add to Cart Button */}
          {isInCart ? (
            <Link
              to="/cart"
              className={cn(
                "w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-center",
                "bg-status-success/10 text-status-success border border-status-success/20",
                "hover:bg-status-success/20 transition-colors flex items-center justify-center gap-2"
              )}
            >
              <FiCheck /> In Cart
            </Link>
          ) : (
            <button
              onClick={() => onMoveToCart(product)}
              className={cn(
                "w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg text-sm font-bold",
                "bg-brand-primary text-text-inverse shadow-sm",
                "hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
              )}
            >
              <FiShoppingCart /> Move to Cart
            </button>
          )}

          {/* Remove Button */}
          <button
            onClick={() => onRemove(product.id)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-border-base text-text-muted hover:text-status-error hover:bg-status-error/5 hover:border-status-error/20 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <FiTrash2 /> <span className="sm:hidden">Remove</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};