import { motion } from 'framer-motion';

interface Props {
  count: number;
  currentIndex: number;
  isAutoPlaying: boolean;
  onSelect: (index: number) => void;
}

export const BannerPagination = ({ count, currentIndex, isAutoPlaying, onSelect }: Props) => (
  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
    {Array.from({ length: count }).map((_, idx) => {
      const isActive = idx === currentIndex;
      return (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-500 cursor-pointer shadow-sm ${
            isActive ? "w-8 sm:w-12 bg-white/20" : "w-1.5 sm:w-2.5 bg-white/20"
          }`}
        >
          {isActive && isAutoPlaying && (
            <motion.div
              className="absolute top-0 left-0 h-full bg-text-inverse"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          )}
          {isActive && !isAutoPlaying && (
            <div className="absolute top-0 left-0 h-full w-full bg-text-inverse" />
          )}
        </button>
      );
    })}
  </div>
);