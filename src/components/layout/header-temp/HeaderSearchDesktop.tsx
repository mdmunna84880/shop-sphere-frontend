import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchInput";

interface HeaderSearchDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function HeaderSearchDesktop({ isOpen, onClose, inputRef, containerRef }: HeaderSearchDesktopProps){
  return (
    <div className="hidden md:flex flex-1 justify-center mx-auto px-5 h-full items-center relative">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="search-bar"
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, x:5 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 5 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <SearchInput
              ref={inputRef}
              onClear={onClose}
              placeholder="Search for products... (Ctrl + K)"
              className="text-sm"
              containerClassName="bg-bg-subtle border-brand-primary/20"
            />
          </motion.div>
        ) : (
          <div className="w-full" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderSearchDesktop;