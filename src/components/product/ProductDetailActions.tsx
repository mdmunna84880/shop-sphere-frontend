import { FiShoppingCart, FiCheck, FiZap } from 'react-icons/fi';
import { cn } from '@/utils/cn';

interface ProductDetailActionsProps {
  isInCart: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onGoToCart: () => void;
  className?: string;
}

export const ProductDetailActions = ({
  isInCart,
  onAddToCart,
  onBuyNow,
  onGoToCart,
  className,
}: ProductDetailActionsProps) => {
  return (
    <div className={cn("mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3", className)}>
      
      {/* 1. Add to Cart / Go to Cart Logic */}
      {isInCart ? (
        <button
          onClick={onGoToCart}
          className={cn(
            "py-3.5 rounded-xl font-bold text-base shadow-sm",
            "flex items-center justify-center gap-2",
            "transition-all cursor-pointer",
            "bg-status-success/10 border border-status-success text-status-success",
            "hover:bg-status-success/20"
          )}
        >
          <FiCheck className="w-5 h-5" />
          Go to Cart
        </button>
      ) : (
        <button
          onClick={onAddToCart}
          className={cn(
            "py-3.5 rounded-xl font-bold text-base",
            "flex items-center justify-center gap-2",
            "transition-all cursor-pointer",
            "bg-transparent border-2 border-brand-primary text-brand-primary",
            "hover:bg-brand-primary hover:text-text-inverse"
          )}
        >
          <FiShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      )}

      {/* 2. Buy Now*/}
      <button
        onClick={onBuyNow}
        className={cn(
          "py-3.5 rounded-xl font-bold text-base shadow-lg shadow-shadow-base",
          "flex items-center justify-center gap-2",
          "transition-all cursor-pointer",
          "bg-brand-accent text-text-inverse",
          "hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        <FiZap className="w-5 h-5 fill-current" />
        Buy Now
      </button>

    </div>
  );
};