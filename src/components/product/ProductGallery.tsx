import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

import { ProductBadge } from "@/components/product/ProductBadge";
import WishlistButton from "./WishlistButton";

interface ProductGalleryProps {
  image: string;
  title: string;
  discount?: number;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  className?: string;
}

export const ProductGallery = ({
  image,
  title,
  discount = 20,
  isWishlisted,
  onToggleWishlist,
  className,
}: ProductGalleryProps) => {
  return (
    <div className={cn("w-full md:w-1/2 p-8 bg-bg-subtle flex items-center justify-center relative group", className)}>
      
      {/* Product Badge for discount */}
      <ProductBadge 
        discount={discount} 
        className="top-6 left-6 px-3 py-1 text-sm" 
      />

      {/* Wishlist Button */}
      <WishlistButton isWishlisted={isWishlisted} onToggleWishlist={onToggleWishlist} />

      {/* Product Image with Animation */}
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={image}
        alt={title}
        className="max-h-100 w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};