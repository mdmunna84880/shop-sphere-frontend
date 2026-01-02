import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="relative flex items-center justify-center min-h-[80dvh] p-4 font-body bg-bg-page mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-sm overflow-hidden",
          "bg-bg-surface border border-border-base",
          "shadow-xl shadow-shadow-base rounded-2xl",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};