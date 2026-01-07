import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

import { cn } from "@/utils/cn";
import Container from "@/components/ui/Container";
import Logo from "@/components/common/Logo";

import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import HeaderSearchMobile from "./HeaderSearchMobile";
import HeaderSearchDesktop from "./HeaderSearchDesktop";
import { useSearchUI } from "./useSearchUI";
import { SearchUIProvider } from "./SearchUIProvider";

/**
 * Internal Header Content Component.
 * Consumes the context to toggle UI elements.
 */
function HeaderContent() {
  const { isSearchOpen, openSearch, isTabletOrDesktop } = useSearchUI();

  // Helper to hide elements when search is active (mainly for mobile)
  const hideOnSearchClass = cn(
    "shrink-0 transition-opacity duration-200",
    !isTabletOrDesktop && isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
  );

  return (
    <header className="fixed top-0 z-30 w-full h-16 sm:h-20 border-b shadow-sm bg-bg-surface border-border-base">
      <Container className="relative flex items-center justify-between h-full gap-4">
        
        {/* Mobile Search Overlay */}
        {!isTabletOrDesktop && <HeaderSearchMobile />}

        {/* Logo */}
        <div className={hideOnSearchClass}>
          <Logo />
        </div>

        {/* Desktop Search Bar */}
        <HeaderSearchDesktop />

        {/* Search Button when to open or when to not */}
        <div className={cn("flex items-center gap-1 md:gap-2", hideOnSearchClass)}>
          
          {/* Search Trigger Button */}
          {!isSearchOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={openSearch}
              className={cn(
                "group flex items-center gap-2 px-4 py-3 rounded-lg",
                "font-body text-sm font-medium tracking-wide",
                "text-text-body hover:text-text-hover hover:bg-bg-interactive-hover",
                "transition-all duration-300 ease-in-out cursor-pointer"
              )}
              aria-label="Open Search (Ctrl+K)"
            >
              <FiSearch size={20} />
              <span className="hidden text-md xl:block">Search</span>
            </motion.button>
          )}

          <NavDesktop />
          <NavMobile />
        </div>
      </Container>
    </header>
  );
}

/**
 * Main Header Component.
 * Wraps the content in the SearchUIProvider to share state.
 */
export default function Header() {
  return (
    <SearchUIProvider>
      <HeaderContent />
    </SearchUIProvider>
  );
}