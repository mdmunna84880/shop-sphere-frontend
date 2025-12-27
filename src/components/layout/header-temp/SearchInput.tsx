import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
  containerClassName?: string;
  ref: React.RefObject<HTMLInputElement | null>;
}

function SearchInput({ onClear, containerClassName = "", className = "", ref, ...props }:SearchInputProps){
    return (
      <div 
        className={`
          flex items-center w-full 
          bg-bg-subtle 
          border border-transparent
          rounded-xl px-4 py-2.5 
          transition-all duration-300 
          group
          focus-within:bg-bg-surface
          focus-within:border-brand-primary/30
          focus-within:ring-4 focus-within:ring-brand-primary/10
          ${containerClassName}
        `}
      >
        <FiSearch className="w-5 h-5 text-text-muted group-focus-within:text-brand-primary transition-colors mr-3 shrink-0" />

        <input
          ref={ref}
          type="text"
          autoComplete="off"
          className={`
            flex-1 bg-transparent outline-none 
            font-body font-medium 
            text-text-main 
            placeholder-text-muted 
            min-w-0
            ${className}
          `}
          {...props}
        />

        <button
          onClick={onClear}
          type="button"
          aria-label="Clear search"
          className="
            p-1 rounded-xl
            text-text-muted 
            hover:bg-bg-interactive-hover hover:text-text-main 
            transition-colors shrink-0
          "
        >
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>
    );
  }

export default SearchInput;