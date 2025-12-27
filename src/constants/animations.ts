import type { Variants } from "framer-motion";

export const menuVariants: Variants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: { 
        type: "spring",
        stiffness: 300, 
        damping: 30 
      }
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30, 
        staggerChildren: 0.1 
      }
    }
  };


export const itemVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

export const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.4 }
    })
  };

export  const contentVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: (delay: number) => ({
      x: 0, 
      opacity: 1,
      transition: { delay, duration: 0.5, ease: "easeOut" }
    })
  };

export  const imageVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };