import { paymentMethods } from "../../../constants/paymentMethod";
import { socialLinks } from "../../../constants/socialLinks";
import Container from "../../common/Container";
import SocialButton from "./SocialButton";

function SiteMeta() {
  return (
    <div className="border-t border-border-base bg-bg-subtle/30">
      <Container className="py-6 md:py-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-4 px-8">
        <p className="text-xs text-text-muted text-center md:text-left w-full md:w-auto">
          &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
        </p>
        <div className="flex justify-center w-full md:w-auto">
          <div className="flex gap-2 text-xl text-text-muted/60 grayscale opacity-70">
            {paymentMethods.map(({ name, icon: Icon }) => (
              <Icon key={name} aria-label={name} />
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full md:w-auto gap-1">
          {socialLinks.map(({ name, href, icon }) => (
            <SocialButton
              key={name}
              icon={icon}
              href={href}
              label={name}
            />
          ))}
        </div>
        
      </Container>
    </div>
  );
}

export default SiteMeta;