import { motion } from "framer-motion";
import { FiShoppingCart, FiCheck, FiZap } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface ProductActionsProps {
  isInCart: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onGoToCart: () => void;
  className?: string;
}

export const ProductActions = ({
  isInCart,
  onAddToCart,
  onBuyNow,
  onGoToCart,
  className
}: ProductActionsProps) => {

  // Helper to prevent the click from bubbling up to the ProductCard Link
  const handleAction = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <div className={cn("grid grid-cols-2 gap-3 mt-auto", className)}>

      {/* Smart Cart Button: Toggles between "Cart" and "Go to Cart" */}
      {isInCart ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAction(onGoToCart)}
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
          onClick={handleAction(onAddToCart)}
          className="
            flex items-center justify-center gap-2 px-3 py-2.5
            rounded-lg border border-brand-primary/20
            bg-bg-subtle text-brand-primary
            font-semibold text-sm
            hover:bg-brand-primary/5 transition-colors
          "
        >
          <FiShoppingCart className="w-4 h-4" />
          Add to Cart
        </motion.button>
      )}

      {/* Buy Now (Primary Action) */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAction(onBuyNow)}
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
  );
};