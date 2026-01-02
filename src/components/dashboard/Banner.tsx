import { motion, AnimatePresence, type PanInfo } from "framer-motion";

import SliderButton from "@/components/common/SliderButton";

// Local Sub-components
import { BannerBackground } from "./BannerBackground";
import { BannerContent } from "./BannerContent";
import { BannerPagination } from "./BannerPagination";
import { useBannerLogic } from "./useBannerLogic";
import { slideVariants, imageVariants } from "./home-animation-variants";
import { bannerItems } from "./BannerItems";

const SWIPE_THRESHOLD = 10000;

const Banner = () => {
  // 1. Connect the Logic Hook
  const { 
    currentIndex, 
    direction, 
    paginate, 
    isPaused, 
    setIsPaused 
  } = useBannerLogic(bannerItems.length);

  const slide = bannerItems[currentIndex];

  // 2. Drag Interaction Logic
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent, 
    { offset, velocity }: PanInfo
  ) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_THRESHOLD) paginate(1);
    else if (swipe > SWIPE_THRESHOLD) paginate(-1);
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
      // Pause on Interaction
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Layer 1: Background */}
      <BannerBackground image={slide.image} index={currentIndex} />

      {/* Layer 2: Content & Product Image */}
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
          className="absolute inset-0 z-10 flex flex-col w-full h-full cursor-grab active:cursor-grabbing md:flex-row"
        >
          
          <BannerContent 
            slide={slide} 
            index={currentIndex} 
            onInteract={() => setIsPaused(true)} 
          />

          {/* Product Image Wrapper */}
          <div className="relative flex items-center justify-center order-1 w-full p-4 md:w-1/2 h-1/2 md:h-full sm:p-6 md:p-8 md:pr-12 lg:pr-16 md:order-2">
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

      {/* Layer 3: Controls */}
      <SliderButton direction="prev" onClick={() => paginate(-1)} />
      <SliderButton direction="next" onClick={() => paginate(1)} />

      <BannerPagination 
        count={bannerItems.length} 
        currentIndex={currentIndex} 
        isAutoPlaying={!isPaused} 
        isPaused={isPaused} 
        onSelect={(index) => paginate(index - currentIndex)} 
      />

    </div>
  );
};

export default Banner;