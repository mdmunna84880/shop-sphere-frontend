import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  type ReactNode 
} from "react";
import { useMedia } from "react-use";

interface SearchUIType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  isTabletOrDesktop: boolean;
}

const SearchUIContext = createContext<SearchUIType | undefined>(undefined);

export function SearchUIProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // We keep this for rendering logic (showing/hiding UI elements)
  const isTabletOrDesktop = useMedia("(min-width: 768px)", false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);

  // 1. Global Keyboard Shortcut (Ctrl + K || Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  // 2. Auto-close search when switching layout
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // This function runs only when the breakpoint is crossed
    const handleResizeChange = () => {
      setIsSearchOpen(false);
    };

    // Modern browsers use addEventListener
    mediaQuery.addEventListener("change", handleResizeChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResizeChange);
  }, []);

  return (
    <SearchUIContext.Provider 
      value={{ 
        isSearchOpen, 
        openSearch, 
        closeSearch, 
        toggleSearch,
        isTabletOrDesktop
      }}
    >
      {children}
    </SearchUIContext.Provider>
  );
}

// Custom Hook for consuming the context and dissabling the to export only component
// eslint-disable-next-line react-refresh/only-export-components
export function useSearchUI() {
  const context = useContext(SearchUIContext);
  if (context === undefined) {
    throw new Error("useSearchUI must be used within a SearchUIProvider");
  }
  return context;
}