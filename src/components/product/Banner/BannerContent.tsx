import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';
import { contentVariants } from '../../../constants/animations';
import type { CarouselItems } from '../../../types';

interface Props {
  slide: CarouselItems;
  index: number;
  onInteract: () => void;
}

export const BannerContent = ({ slide, index, onInteract }: Props) => (
  <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 relative order-2 md:order-1">
    <div className="max-w-xl w-full">
      <motion.div
        key={`text-${index}`}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center md:items-start text-center md:text-left"
      >
        {/* Tag: Uses Brand Accent (Coral) for high visibility */}
        <motion.span
          custom={0.1}
          variants={contentVariants}
          className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 mb-2 sm:mb-4 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-md bg-brand-accent text-text-inverse shadow-sm shadow-shadow-base"
        >
          {slide.tag}
        </motion.span>

        {/* Heading: Uses Inverse Text (White) on dark background */}
        <motion.h1
          custom={0.2}
          variants={contentVariants}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-text-inverse leading-tight mb-2 sm:mb-4 drop-shadow-xl"
        >
          {slide.title}
        </motion.h1>

        {/* Subtitle: Inverse Text with opacity */}
        <motion.p
          custom={0.3}
          variants={contentVariants}
          className="text-sm sm:text-base md:text-lg text-text-inverse/80 mb-6 sm:mb-8 font-medium max-w-xs sm:max-w-md"
        >
          {slide.subtitle}
        </motion.p>

        {/* CTA Button: Surface (White) bg with Primary Text */}
        <motion.div custom={0.4} variants={contentVariants}>
          <Link
            to={slide.link}
            onClick={onInteract}
            className="
              group relative inline-flex items-center gap-2 sm:gap-3 
              px-6 py-3 sm:px-8 sm:py-3.5 
              font-bold rounded-xl overflow-hidden transition-all duration-300 
              shadow-lg shadow-shadow-base 
              
              /* Default State */
              bg-text-inverse 
              text-brand-primary 
              
              /* Hover State: Uses Brand Accent (Coral) */
              hover:bg-brand-accent 
              hover:text-text-inverse 
              hover:scale-105 active:scale-95 
              text-sm sm:text-base
            "
          >
            <span>{slide.cta}</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </div>
);