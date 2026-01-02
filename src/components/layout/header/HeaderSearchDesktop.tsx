import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "react-use";

import GlobalSearch from "./GlobalSearch";
import { useSearchUI } from "./SearchUIContext";

/**
 * Desktop Search Wrapper.
 * Connects to SearchUIContext for visibility state.
 */
function HeaderSearchDesktop() {
  const { isSearchOpen, closeSearch } = useSearchUI();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside the container
  useClickAway(containerRef, () => {
    if (isSearchOpen) closeSearch();
  });

  return (
    <div className="hidden md:flex flex-1 justify-center mx-auto px-5 h-full items-center relative">
      <AnimatePresence mode="wait">
        {isSearchOpen ? (
          <motion.div
            key="search-bar"
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, x: 5 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 5 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <GlobalSearch
              autoFocus={true} // Triggers the internal focus logic
              onClear={closeSearch}
              className="text-sm bg-bg-subtle border-brand-primary/20"
            />
          </motion.div>
        ) : (
          <div className="w-full" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderSearchDesktop;