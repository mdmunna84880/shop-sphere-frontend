import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { imageVariants, slideVariants } from '../../../constants/animations';
import { BannerBackground } from './BannerBackground';
import { BannerContent } from './BannerContent';
import { BannerPagination } from './BannerPagination';
import CarouselArrow from '../../ui/CarouselArrow';
import { carouselItems } from '../../../constants/carouselItems'; 
import { useBannerLogic } from '../../../hooks/useBannerLogic';

const SWIPE_THRESHOLD = 10000;

const Banner = () => {
  const { 
    currentIndex, 
    direction, 
    paginate, 
    isPaused, 
    setIsPaused 
  } = useBannerLogic(carouselItems.length);

  const slide = carouselItems[currentIndex];

  // 1. FIX: Updated Drag Logic (Removed handleManualInteraction)
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent, 
    { offset, velocity }: PanInfo
  ) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_THRESHOLD) paginate(1);       // Call paginate directly
    else if (swipe > SWIPE_THRESHOLD) paginate(-1);  // Call paginate directly
  };

  return (
    <div 
      className="
        relative w-full 
        mt-16 sm:mt-20 
        h-[calc(100dvh-5rem)] 
        overflow-hidden
        bg-bg-footer 
        font-body
        group
      "
      // === PAUSE LOGIC EVENTS ===
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      
      {/* Background Layer */}
      <BannerBackground image={slide.image} index={currentIndex} />

      {/* Content Layer */}
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
            // 2. FIX: Removed setIsAutoPlaying. 
            // We pass an empty function or simple pause because clicking a link navigates away anyway.
            onInteract={() => setIsPaused(true)} 
          />

          {/* Product Image Section */}
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

      {/* Navigation Controls */}
      <CarouselArrow direction="prev" onClick={() => paginate(-1)} />
      <CarouselArrow direction="next" onClick={() => paginate(1)} />

      <BannerPagination 
        count={carouselItems.length} 
        currentIndex={currentIndex} 
        isAutoPlaying={!isPaused} 
        isPaused={isPaused} 
        // 3. FIX: Calculated the jump manually
        // Since we removed jumpToSlide from the hook, we just calculate the difference here.
        onSelect={(index) => paginate(index - currentIndex)} 
      />

    </div>
  );
};

export default Banner;