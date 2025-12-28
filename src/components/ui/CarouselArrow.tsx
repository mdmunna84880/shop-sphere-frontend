import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import cn from "../../utils/cn";

interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export default function CarouselArrow({ direction, onClick }: NavButtonProps) {
  const Icon = direction === 'prev' ? FiChevronLeft : FiChevronRight;
  const positionClass = direction === 'prev' ? "left-2 sm:left-4" : "right-2 sm:right-4";
  
  return (
    <button
      onClick={onClick}
      className={cn(`flex absolute top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-xl
        bg-text-inverse/10 
        border border-text-inverse/10 
        text-text-inverse 
        backdrop-blur-md
        transition-all duration-300 
        hover:bg-brand-primary 
        hover:text-text-inverse 
        hover:scale-110 active:scale-95 
        opacity-100 md:opacity-0 md:group-hover:opacity-100
        `, positionClass)}
    >
      <Icon size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}