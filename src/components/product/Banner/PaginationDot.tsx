import { motion, useAnimate, type AnimationPlaybackControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface DotProps {
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
  isAutoPlaying: boolean;
}

// FIX 1: Added 'export' so other files can use this component
export const PaginationDot = ({ isActive, isPaused, onClick, isAutoPlaying }: DotProps) => {
  const [scope, animate] = useAnimate();
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    // 1. Reset immediately if not active
    if (!isActive) {
      animate(scope.current, { width: "0%" }, { duration: 0 });
      return;
    }

    // 2. Start Animation if Active & Autoplay is on
    if (isActive && isAutoPlaying) {
      animationRef.current = animate(
        scope.current, 
        { width: "100%" }, 
        { duration: 5, ease: "linear" }
      );
    }
    
    return () => {
      animationRef.current?.stop();
    };
    // FIX 2: Added 'scope' and 'animate' to dependency array to satisfy the linter
  }, [isActive, isAutoPlaying, animate, scope]);

  // Handle Pause/Resume
  useEffect(() => {
    if (isPaused) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.play();
    }
  }, [isPaused]);

  return (
    <button
      onClick={onClick}
      className={`
        relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-500 cursor-pointer shadow-sm
        ${isActive ? "w-8 sm:w-12 bg-text-inverse/20" : "w-1.5 sm:w-2.5 bg-text-inverse/20"}
      `}
    >
      <motion.div
        ref={scope}
        className="absolute top-0 left-0 h-full bg-text-inverse"
        initial={{ width: "0%" }}
      />
    </button>
  );
};