import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) => {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // If there's only 1 page, don't show controls
  if (totalPages <= 1) return null;

  // Generate page numbers (simple version)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg border border-border-base bg-bg-surface transition-colors",
          "hover:bg-bg-subtle hover:border-border-strong",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-bg-surface"
        )}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all",
              currentPage === page
                ? "bg-brand-primary text-text-inverse shadow-md"
                : "bg-bg-surface border border-border-base text-text-muted hover:text-text-main hover:border-border-strong"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-lg border border-border-base bg-bg-surface transition-colors",
          "hover:bg-bg-subtle hover:border-border-strong",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-bg-surface"
        )}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};