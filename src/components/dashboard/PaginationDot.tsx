import { useEffect, useRef } from "react";
import { motion, useAnimate, type AnimationPlaybackControls } from "framer-motion";
import { cn } from "@/utils/cn";

interface PaginationDotProps {
  /** Is this the currently visible slide? */
  isActive: boolean;
  /** Is the carousel currently paused (touch and pressed)? */
  isPaused: boolean;
  /** Should the progress bar animate? */
  isAutoPlaying: boolean;
  /** Callback when clicked */
  onClick: () => void;
}

/**
 * An individual navigation dot for the Banner.
 * * Features a progressive fill animation using Framer Motion.
 */
export const PaginationDot = ({
  isActive,
  isPaused,
  isAutoPlaying,
  onClick,
}: PaginationDotProps) => {
  const [scope, animate] = useAnimate();
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  // Animation Logic: Reset or Play based on active state
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
    
    // Cleanup: Stop animation on unmount or state change
    return () => {
      animationRef.current?.stop();
    };
  }, [isActive, isAutoPlaying, animate, scope]);

  // Pause Logic: Respond to user interaction
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
      aria-label={isActive ? "Current Slide" : "Go to slide"}
      className={cn(
        "relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-500 cursor-pointer shadow-sm",
        isActive ? "w-8 sm:w-12 bg-text-inverse/20" : "w-1.5 sm:w-2.5 bg-text-inverse/20"
      )}
    >
      <motion.div
        ref={scope}
        className="absolute top-0 left-0 h-full bg-text-inverse"
        initial={{ width: "0%" }}
      />
    </button>
  );
};