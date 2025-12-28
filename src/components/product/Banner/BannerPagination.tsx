// FIX 3: Import the dot component
import { PaginationDot } from './PaginationDot';

interface Props {
  count: number;
  currentIndex: number;
  isAutoPlaying: boolean;
  isPaused: boolean;
  onSelect: (index: number) => void;
}

export const BannerPagination = ({ count, currentIndex, isPaused, isAutoPlaying, onSelect }: Props) => (
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