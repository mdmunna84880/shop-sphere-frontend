import { useState, useEffect, useCallback, useRef } from 'react';

export const useBannerLogic = (slideCount: number, fullDuration = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // <--- ADDED THIS BACK
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs to track time without causing re-renders
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(fullDuration);
  const timerRef = useRef<number | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection); // <--- UPDATE DIRECTION HERE

    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return next;
    });

    // RESET TIMER: When slide changes, reset remaining time to full 5s
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
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
      return;
    }

    // B. If Running: Start a timer for strictly the REMAINING time
    startTimeRef.current = Date.now();
    
    timerRef.current = window.setTimeout(() => {
      paginate(1);
    }, remainingTimeRef.current);

    // Cleanup
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