import SiteInfo from "./SiteInfo";
import SiteMeta from "./SiteMeta";

/**
 * Main Footer Layout Component.
 * Assembles the Site Information (Links, Newsletter) and Meta Information (Copyright, Socials).
 * * Architecture Note:
 * This component is purely structural. It defines the outer wrapper (background, border)
 * and stacks the three main footer sections vertically.
 */
const Footer = () => {
  return (
    <footer className="border-t bg-bg-surface border-border-base font-body">
      {/* Upper Footer: Branding, Navigation Links, Newsletter */}
      <SiteInfo />
      
      {/* Lower Footer: Copyright, Payment Icons, Social Links */}
      <SiteMeta />
    </footer>
  );
};

export default Footer;