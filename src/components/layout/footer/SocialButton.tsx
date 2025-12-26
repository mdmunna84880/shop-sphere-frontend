import type { IconType } from "react-icons";

const SocialButton = ({ icon: Icon, href, label }: { icon: IconType; href: string; label: string }) => (
  <a
    href={href}
    aria-label={label}
    className="
      flex items-center justify-center w-10 h-10 rounded-lg
      text-text-muted transition-all duration-300
      hover:bg-bg-interactive-hover hover:text-brand-primary
    "
  >
    <Icon size={20} />
  </a>
);

export default SocialButton;