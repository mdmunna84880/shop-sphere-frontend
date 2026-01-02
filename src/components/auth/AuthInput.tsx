import {type IconType } from 'react-icons';
import { cn } from '@/utils/cn';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconType;
  error?: string;
}

export const AuthInput = ({ label, icon: Icon, error, className, ...props }: AuthInputProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-text-main">{label}</label>
      <div className="relative group">
        <Icon 
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors w-4 h-4",
            error ? "text-status-error" : "text-text-muted group-focus-within:text-brand-primary/70"
          )} 
        />
        <input 
          className={cn(
            "w-full pl-9 pr-3 py-2.5 text-sm bg-bg-subtle rounded-lg",
            "focus:outline-none focus:ring-2 transition-all text-text-main",
            error 
              ? "border border-status-error focus:ring-status-error/20" 
              : "border border-border-base focus:ring-brand-primary/20 focus:border-brand-primary",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="ml-1 text-[10px] text-status-error">{error}</p>
      )}
    </div>
  );
};