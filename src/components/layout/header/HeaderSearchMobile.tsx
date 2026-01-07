import { useRef } from "react";
import { useClickAway } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

import GlobalSearch from "./GlobalSearch";
import { useSearchUI } from "./useSearchUI";

/**
 * Mobile Search Wrapper.
 * Overlays the entire header on mobile when active.
 */
const HeaderSearchMobile = () => {
  const { isSearchOpen, closeSearch } = useSearchUI();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    closeSearch();
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-40 flex items-center bg-bg-surface w-full h-full"
        >
          <GlobalSearch
            autoFocus={true}
            onClear={closeSearch}
            className="text-base bg-bg-subtle shadow-inner w-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderSearchMobile;