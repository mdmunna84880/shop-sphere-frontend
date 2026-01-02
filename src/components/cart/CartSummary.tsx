import { FiShield } from 'react-icons/fi';
import { cn } from '@/utils/cn';

interface CartSummaryProps {
  cartTotalAmount: number;
  onCheckout: () => void;
  className?: string;
}

export const CartSummary = ({ 
  cartTotalAmount, 
  onCheckout, 
  className 
}: CartSummaryProps) => {
  
  // Helper for consistent currency formatting
  const formatPrice = (amount: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  return (
    <div className={cn("lg:w-96", className)}>
      <div className="sticky p-6 border shadow-sm top-24 bg-bg-surface rounded-xl border-border-base">
        
        <h2 className="pb-4 mb-6 text-lg font-bold border-b text-text-main border-border-base">
          Order Summary
        </h2>

        {/* Line Items */}
        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-text-body">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(cartTotalAmount)}</span>
          </div>
          <div className="flex justify-between text-text-body">
            <span>Shipping Estimate</span>
            <span className="font-medium text-status-success">Free</span>
          </div>
          <div className="flex justify-between text-text-body">
            <span>Tax Estimate</span>
            <span className="font-medium">$0.00</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between pt-4 mb-6 text-xl font-bold border-t text-text-main border-border-base">
          <span>Order Total</span>
          <span>{formatPrice(cartTotalAmount)}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="
            w-full py-3.5 rounded-xl
            bg-brand-accent text-text-inverse
            font-bold text-lg shadow-lg shadow-brand-accent/25
            hover:bg-brand-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98]
          "
        >
          Checkout
        </button>

        {/* Trust Signal */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-text-muted">
          <FiShield className="w-4 h-4" />
          <span>Secure Checkout Process</span>
        </div>
        
      </div>
    </div>
  );
};