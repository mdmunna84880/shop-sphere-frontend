import { cn } from "@/utils/cn";
import { formatCurrencyToUS } from "@/utils/formateCurrency";

interface ProductPriceProps {
  price: number;
  discount?: number;
  className?: string;
}

export const ProductPrice = ({ price, discount = 20, className }: ProductPriceProps) => {
  // Logic: Calculate original price based on the fake/real discount
  // Formula: Original = Current / (1 - discount%)
  const originalPrice = price / (1 - discount / 100);

  return (
    <div className={cn("mt-auto mb-4", className)}>
      <div className="flex items-baseline gap-2">
        {/* Current Price */}
        <span className="text-xl font-bold text-text-main">
          {formatCurrencyToUS(price)}
        </span>
        
        {/* Original Price (Strikethrough) */}
        <span className="text-sm text-text-muted line-through decoration-text-muted">
          {formatCurrencyToUS(originalPrice)}
        </span>
      </div>
      
      {/* Marketing Text */}
      <p className="text-xs text-status-success font-semibold mt-0.5">
        Free Delivery by Tomorrow
      </p>
    </div>
  );
};