import { FiSearch, FiArrowRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
  containerClassName?: string;
  ref: React.RefObject<HTMLInputElement | null>;
}

function SearchInput({ onClear, containerClassName = "", className = "", ref, ...props }: SearchInputProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 1. EXTRACT THE STRING VALUE FIRST
  // This allows us to use a stable primitive dependency
  const queryFromUrl = searchParams.get("search") || "";

  // 2. INITIALIZE STATE WITH URL VALUE
  // This prevents an unnecessary re-render on the very first mount
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  // 3. SYNC WITH URL (Correctly)
  // We depend on 'queryFromUrl' (string) instead of 'searchParams' (object)
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      onClear(); 
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    navigate("/"); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div 
      className={`
        flex items-center w-full 
        bg-bg-subtle 
        border border-transparent
        rounded-xl px-2 py-1.5 
        transition-all duration-300 
        group
        focus-within:bg-bg-surface
        focus-within:border-brand-primary/30
        focus-within:ring-4 focus-within:ring-brand-primary/10
        ${containerClassName}
      `}
    >
      <FiSearch className="w-5 h-5 text-text-muted ml-2 mr-2 shrink-0" />

      <input
        ref={ref}
        type="text"
        autoComplete="off"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`
          flex-1 bg-transparent outline-none 
          font-body font-medium 
          text-text-main 
          placeholder-text-muted 
          min-w-0
          h-full py-1
          ${className}
        `}
        {...props}
      />

      <div className="flex items-center gap-1">
        {searchTerm && (
          <button
            onClick={handleReset}
            type="button"
            title="Clear Search"
            className="p-1.5 rounded-full text-text-muted hover:bg-bg-interactive-hover hover:text-status-error transition-colors"
          >
            <RxCross2 className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleSearch}
          type="button"
          disabled={!searchTerm.trim()}
          className={`
            p-2 rounded-lg transition-all duration-200 flex items-center justify-center
            ${searchTerm.trim() 
              ? "bg-brand-primary text-text-inverse hover:bg-brand-hover shadow-sm" 
              : "bg-transparent text-text-muted cursor-not-allowed opacity-50 hidden"
            }
          `}
        >
          <FiArrowRight className="w-5 h-5" /> 
        </button>
      </div>
    </div>
  );
}

export default SearchInput;