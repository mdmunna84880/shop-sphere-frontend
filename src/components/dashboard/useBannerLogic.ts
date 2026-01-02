import { useState, useEffect, useCallback, useRef } from 'react';

interface BannerLogicReturn {
  currentIndex: number;
  direction: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  paginate: (newDirection: number) => void;
}

/**
 * Custom Hook to manage Banner/Carousel logic.
 * * Features:
 * 1. Auto-play with pause on pressing interaction.
 * 2. Resumable Timer: If paused with 1s left, it resumes with 1s left, not 5s.
 * 3. Direction tracking for Framer Motion slide animations.
 * **@param slideCount Total number of slides
 * @param fullDuration Duration in ms per slide (default 5000ms)
 */
export const useBannerLogic = (
  slideCount: number, 
  fullDuration: number = 5000
): BannerLogicReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs to track time without causing re-renders
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(fullDuration);
  const timerRef = useRef<number | null>(null);

  /**
   * Main navigation function.
   * Handles circular indexing (Next at end -> Start, Prev at start -> End)
   */
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);

    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return next;
    });

    // RESET TIMER: When slide changes, reset remaining time to full duration
    remainingTimeRef.current = fullDuration;
  }, [slideCount, fullDuration]);

  // The Resumable Timer Logic
  useEffect(() => {
    // A. If Paused: Stop everything, Calculate what is left
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      // Determine how much time passed since the slide started
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        // Ensure we don't get negative time
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
      return;
    }

    // B. If Running: Start a timer for strictly the REMAINING time
    startTimeRef.current = Date.now();
    
    timerRef.current = window.setTimeout(() => {
      paginate(1);
    }, remainingTimeRef.current);

    // Cleanup on unmount or re-run
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, paginate, currentIndex]); 

  return {
    currentIndex,
    direction,
    isPaused,
    setIsPaused,
    paginate
  };
};