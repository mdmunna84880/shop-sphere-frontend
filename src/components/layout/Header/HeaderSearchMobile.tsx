import { useRef } from "react";
import { useClickAway } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchInput";

interface HeaderSearchMobileProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const HeaderSearchMobile = ({ isOpen, onClose, inputRef }: HeaderSearchMobileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    onClose();
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-40 flex items-center bg-bg-surface w-full h-full"
        >
          <SearchInput
            ref={inputRef}
            onClear={onClose}
            placeholder="Search products..."
            className="text-base"
            containerClassName="bg-bg-subtle shadow-inner w-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderSearchMobile;