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