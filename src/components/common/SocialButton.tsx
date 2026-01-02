import type { IconType } from "react-icons";
import { cn } from "@/utils/cn";

interface SocialButtonProps {
  /** The icon component from react-icons */
  icon: IconType;
  /** The URL to navigate to */
  href: string;
  /** Accessible label for screen readers */
  label: string;
  /** Optional class overrides */
  className?: string;
}

/**
 * A consistent button style for social media links.
 * Used in Footer and potentially Sidebars.
 */
const SocialButton = ({ icon: Icon, href, label, className }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={cn(
      "flex items-center justify-center w-10 h-10 rounded-lg",
      "text-text-muted transition-all duration-300",
      "hover:bg-bg-interactive-hover hover:text-brand-primary",
      className
    )}
    title={label}
  >
    <Icon size={20} />
  </a>
);

export default SocialButton;