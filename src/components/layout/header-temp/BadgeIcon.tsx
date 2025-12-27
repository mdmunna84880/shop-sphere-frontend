import type { IconType } from "react-icons";

interface BadgeIconProps {
  icon: IconType;
  title: string;
  count?: number;
  className?: string;
}

function BadgeIcon({ icon: Icon, title, count = 0, className = "" }: BadgeIconProps){
  const showBadge = ["Cart", "Wishlist"].includes(title);

  return (
    <div className="relative inline-flex items-center justify-center">
      <Icon className={className} size={20} />
      
      {showBadge && (
        <span className="
          absolute -top-2 -right-1 
          flex h-4 w-4 items-center justify-center 
          rounded-md leading-none
          bg-brand-accent 
          text-[10px] font-bold text-text-inverse
          shadow-sm 
          ring-2 ring-bg-surface
        ">
          {count}
        </span>
      )}
    </div>
  );
};

export default BadgeIcon;