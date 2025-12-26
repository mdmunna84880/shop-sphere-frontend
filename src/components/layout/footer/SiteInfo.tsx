import { contactDetail, footerData } from "../../../constants/footerdata";
import Container from "../../common/Container";
import Logo from "../../common/Logo";
import { Link } from "react-router";
import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";

function SiteInfo() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="py-10 sm:py-12 md:py-16 xl:py-20 2xl:py-24 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 2xl:gap-16">
        <div className="lg:col-span-3 space-y-6">
          <Logo />
          <p className="text-text-body text-sm leading-relaxed max-w-sm md:max-w-md lg:max-w-full">
            {footerData.about}
          </p>
          <div className="space-y-3 pt-2">
            {contactDetail.map(({ data, href, icon: Icon }) => (
              <a
                key={data}
                href={href}
                className="group flex items-center gap-3 text-sm text-text-body hover:text-brand-primary transition-colors"
              >
                <Icon className="text-text-muted group-hover:text-brand-primary transition-colors" />
                <span className="font-medium">{data}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 lg:px-4 xl:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-y-10 lg:gap-x-4 xl:gap-x-8">
            {footerData.columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-heading font-bold text-text-main mb-4 text-sm sm:text-base lg:text-sm xl:text-base">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-text-muted hover:text-brand-primary transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="space-y-4 max-w-md md:max-w-lg lg:max-w-none">
            <h4 className="font-heading font-bold text-text-main text-base flex items-center gap-2">
              <FiSend className="text-brand-primary" />
              Stay in the loop
            </h4>
            <p className="text-text-muted text-sm leading-relaxed">
              Get updates on new arrivals and exclusive offers directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative group pt-1 flex flex-col">
              <div className="relative w-full">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary transition-colors z-10" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full pl-11 pr-2 py-3 
                    bg-bg-subtle 
                    border border-transparent rounded-xl
                    font-body text-sm text-text-main placeholder-text-muted
                    outline-none transition-all duration-300
                    focus:bg-bg-surface focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/10
                    shadow-sm
                  "
                />
              </div>
              <button
                  type="submit"
                  className="
                    bg-brand-primary hover:bg-brand-hover mt-2 ml-auto
                    text-text-inverse text-xs font-bold uppercase tracking-wide
                    px-3 py-3 sm:px-3 sm:py-4 rounded-lg transition-colors
                    cursor-pointer
                  "
                >
                  Subscribe
                </button>
            </form>
          </div>
        </div>

      </div>
    </Container>
  );
}

export default SiteInfo;