import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import { cn } from "@/utils/cn";
import Input from "@/components/ui/Input";

interface GlobalSearchProps {
  /** Callback triggered when search is submitted or cleared */
  onClear?: () => void;
  /** External class overrides */
  className?: string;
  /** If true, the input will focus automatically on mount */
  autoFocus?: boolean; 
}

export default function GlobalSearch({ 
  onClear, 
  className, 
  autoFocus = false 
}: GlobalSearchProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Sync Logic
  const queryFromUrl = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  // 2. Internal Focus Management
  useEffect(() => {
    if (autoFocus) {
      // Small delay to ensure the animation (if any) has started/stabilized
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  // 3. Handlers
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      if (onClear) onClear();
      inputRef.current?.blur();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    navigate("/");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // 4. Icons
  const SearchIcon = <FiSearch className="w-5 h-5" />;

  const ActionButtons = (
    <>
      {searchTerm && (
        <button
          onClick={handleReset}
          type="button"
          aria-label="Clear Search"
          className="p-1 rounded-md text-text-muted hover:bg-bg-interactive-hover hover:text-status-error transition-colors"
        >
          <RxCross2 className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={handleSearch}
        type="button"
        disabled={!searchTerm.trim()}
        className={cn(
           "p-1 rounded-lg transition-all duration-200 flex items-center justify-center",
           searchTerm.trim() 
             ? "bg-brand-primary text-text-inverse hover:bg-brand-hover shadow-sm sm:hidden" 
             : "hidden"
        )}
      >
        <FiArrowRight className="w-4 h-4" />
      </button>
    </>
  );

  return (
    <Input
      ref={inputRef}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search products..."
      
      startIcon={SearchIcon}
      endIcon={ActionButtons}
      
      containerClassName={className}
    />
  );
}