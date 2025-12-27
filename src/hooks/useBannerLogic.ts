import { useState, useCallback } from 'react';
import { useInterval } from 'react-use';

export const useBannerLogic = (slideCount: number, autoPlayDuration = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return next;
    });
  }, [slideCount]);

  const handleManualInteraction = useCallback((action: () => void) => {
    setIsAutoPlaying(false);
    action();
  }, []);

  const jumpToSlide = (index: number) => {
    handleManualInteraction(() => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    });
  };

  useInterval(
    () => paginate(1),
    isAutoPlaying ? autoPlayDuration : null
  );

  return {
    currentIndex,
    direction,
    isAutoPlaying,
    paginate,
    handleManualInteraction,
    jumpToSlide,
    setIsAutoPlaying
  };
};