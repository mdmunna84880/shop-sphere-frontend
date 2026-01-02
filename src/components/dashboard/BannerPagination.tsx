import { PaginationDot } from "./PaginationDot";

interface BannerPaginationProps {
  /** Total number of slides */
  count: number;
  /** Index of the currently active slide */
  currentIndex: number;
  /** Is the slideshow running? (Used for progress bar animation) */
  isAutoPlaying: boolean;
  /** Is the slideshow paused by user interaction? */
  isPaused: boolean;
  /** Callback to jump to a specific slide */
  onSelect: (index: number) => void;
}

/**
 * Container for the pagination dots at the bottom of the banner.
 * Manages the layout of the dots.
 */
export const BannerPagination = ({
  count,
  currentIndex,
  isPaused,
  isAutoPlaying,
  onSelect,
}: BannerPaginationProps) => {
  return (
    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
      {Array.from({ length: count }).map((_, idx) => (
        <PaginationDot
          key={idx}
          isActive={idx === currentIndex}
          isPaused={isPaused}
          isAutoPlaying={isAutoPlaying}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
  );
};