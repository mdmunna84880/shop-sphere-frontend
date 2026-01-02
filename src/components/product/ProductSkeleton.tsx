import { cn } from "@/utils/cn";

interface ProductSkeletonProps {
  className?: string;
}

export const ProductSkeleton = ({ className }: ProductSkeletonProps) => {
  return (
    <div 
      className={cn(
        "w-full max-w-75 mx-auto",
        "bg-bg-surface rounded-xl border border-border-base",
        "p-4 shadow-sm animate-pulse",
        className
      )}
    >
      {/* Image Placeholder */}
      <div className="w-full aspect-square bg-bg-subtle rounded-lg mb-4" />
      
      {/* Category Placeholder */}
      <div className="h-3 w-1/3 bg-bg-subtle rounded mb-2" />
      
      {/* Title Placeholder */}
      <div className="h-4 w-3/4 bg-bg-subtle rounded mb-3" />
      
      {/* Rating Placeholder */}
      <div className="h-3 w-1/4 bg-bg-subtle rounded mb-4" />
      
      {/* Price Placeholder */}
      <div className="h-8 w-1/2 bg-bg-subtle rounded mb-4" />
      
      {/* Buttons Placeholder */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="h-10 bg-bg-subtle rounded-lg" />
        <div className="h-10 bg-bg-subtle rounded-lg" />
      </div>
    </div>
  );
};