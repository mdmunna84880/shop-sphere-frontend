import { Link } from 'react-router';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { cn } from '@/utils/cn';

export const WishlistEmpty = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      {/* Icon Circle */}
      <div className="w-24 h-24 mb-6 rounded-full bg-bg-surface flex items-center justify-center shadow-sm border border-border-base">
        <FiHeart className="w-10 h-10 text-text-muted/40" />
      </div>
      
      {/* Text */}
      <h2 className="text-2xl font-bold text-text-main font-heading mb-2">
        Your Wishlist is Empty
      </h2>
      <p className="text-text-muted mb-8 max-w-md">
        Save items you want to buy later. They will be waiting for you here!
      </p>
      
      {/* Action Button */}
      <Link 
        to="/" 
        className={cn(
          "flex items-center gap-2 px-8 py-3 rounded-xl",
          "bg-brand-primary text-text-inverse font-bold",
          "shadow-lg shadow-brand-primary/20",
          "hover:bg-brand-hover transition-all hover:-translate-y-1"
        )}
      >
        <FiArrowLeft />
        Explore Products
      </Link>
    </div>
  );
};