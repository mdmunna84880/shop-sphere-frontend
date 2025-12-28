import {type IconType } from "react-icons";

interface BadgeIconProps {
  icon: IconType;
  title?: string;
  className?: string;
  count?: number;
}

const BadgeIcon = ({ icon: Icon, title, className = "", count = 0 }: BadgeIconProps) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* The main Icon */}
      <Icon className={className} title={title} />
      
      {/* The Notification Dot */}
      {count > 0 && (
        <span className="
          absolute -top-2 -right-2 
          flex items-center justify-center 
          min-w-[18px] h-[18px] 
          px-1
          text-[10px] font-bold leading-none 
          text-[var(--color-text-inverse)]
          bg-[var(--color-brand-accent)] 
          rounded-full 
          shadow-sm ring-1 ring-white
        ">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default BadgeIcon;