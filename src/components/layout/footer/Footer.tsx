import SiteInfo from "./SiteInfo";
import SiteMeta from "./SiteMeta";

const Footer = () => {

  return (
    <footer className="bg-bg-surface border-t border-border-base font-body">
        <SiteInfo />
        <SiteMeta />
    </footer>
  );
};

export default Footer;