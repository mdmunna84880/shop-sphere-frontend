import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { bannerSlides } from '../../../constants/bannerData';
import { imageVariants, slideVariants } from '../../../constants/animations';

import { useBannerLogic } from "../../../hooks/useBannerLogic"
import { BannerBackground } from './BannerBackground';
import { BannerContent } from './BannerContent';
import { BannerPagination } from './BannerPagination';
import NavButton from './NavButton';

const SWIPE_THRESHOLD = 10000;

const Banner = () => {
  const { 
    currentIndex, 
    direction, 
    isAutoPlaying, 
    paginate, 
    handleManualInteraction, 
    jumpToSlide,
    setIsAutoPlaying 
  } = useBannerLogic(bannerSlides.length);

  const slide = bannerSlides[currentIndex];

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent, 
    { offset, velocity }: PanInfo
  ) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_THRESHOLD) handleManualInteraction(() => paginate(1));
    else if (swipe > SWIPE_THRESHOLD) handleManualInteraction(() => paginate(-1));
  };

  return (
    <div className="relative w-full mt-16 sm:mt-20 h-[calc(100dvh-5rem)] overflow-hidden bg-bg-footer group font-body">
      
      <BannerBackground image={slide.image} index={currentIndex} />

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-10 w-full h-full flex flex-col md:flex-row cursor-grab active:cursor-grabbing"
        >
          
          <BannerContent 
            slide={slide} 
            index={currentIndex} 
            onInteract={() => setIsAutoPlaying(false)} 
          />

          <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-2 flex items-center justify-center p-4 sm:p-6 md:p-8 md:pr-12 lg:pr-16">
            <motion.img
              key={`img-${currentIndex}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain md:object-right max-h-[85%] sm:max-h-[90%] drop-shadow-2xl"
              draggable="false"
            />
          </div>

        </motion.div>
      </AnimatePresence>

      <NavButton direction="prev" onClick={() => handleManualInteraction(() => paginate(-1))} />
      <NavButton direction="next" onClick={() => handleManualInteraction(() => paginate(1))} />

      <BannerPagination 
        count={bannerSlides.length} 
        currentIndex={currentIndex} 
        isAutoPlaying={isAutoPlaying} 
        onSelect={jumpToSlide} 
      />

    </div>
  );
};

export default Banner;