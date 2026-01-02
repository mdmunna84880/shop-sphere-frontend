import { FiTruck, FiShield } from "react-icons/fi";
import { cn } from "@/utils/cn";
import { ProductRating } from "@/components/product/ProductRating";
import type { Product } from "@/types/product.types";
import { formatCurrencyToUS } from "@/utils/formateCurrency";

interface ProductInfoProps {
  product: Product;
  discount?: number;
  className?: string;
}

export const ProductInfo = ({ product, discount = 20, className }: ProductInfoProps) => {
  // Calculate original price for strike-through
  const originalPrice = product.price / (1 - discount / 100);

  return (
    <div className={cn("flex flex-col mb-8", className)}>
      
      {/* Category */}
      <span className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
        {product.category}
      </span>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-main font-heading mb-4 leading-tight">
        {product.title}
      </h1>

      {/* Rating Component*/}
      <div className="flex items-center gap-4 mb-6">
        <ProductRating 
          rate={product.rating.rate} 
          count={product.rating.count} 
          className="mb-0 scale-110 origin-left" 
        />
        <span className="text-text-muted text-sm border-l border-border-base pl-4 ml-2">
          Verified Purchase
        </span>
      </div>

      {/* Price Block */}
      <div className="mb-8 p-4 bg-bg-page rounded-xl border border-border-base">
        <div className="flex items-end gap-3 mb-1">
          <span className="text-3xl font-bold text-text-main font-heading">
            {formatCurrencyToUS(product.price)}
          </span>
          <span className="text-lg text-text-muted line-through mb-1">
            {formatCurrencyToUS(originalPrice)}
          </span>
        </div>
        <p className="text-status-success text-sm font-medium">
          Inclusive of all taxes
        </p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-text-main mb-2">Description</h3>
        <p className="text-text-body leading-relaxed text-sm md:text-base">
          {product.description}
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <FiTruck className="w-5 h-5 text-brand-primary" />
          Free Delivery
        </div>
        <div className="flex items-center gap-3 text-sm text-text-muted">
          <FiShield className="w-5 h-5 text-brand-primary" />
          2 Year Warranty
        </div>
      </div>

    </div>
  );
};