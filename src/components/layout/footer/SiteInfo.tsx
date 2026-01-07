/** @format */

import { useState } from "react";
import { Link } from "react-router";
import { FiMail, FiSend } from "react-icons/fi";

// Shared Components
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Logo from "@/components/common/Logo";

// Data
import { contactDetail, footerData } from "@/constants/footerData";

function SiteInfo() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="px-10 py-10 sm:py-12 md:py-16 xl:py-20 2xl:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 sm:gap-12 lg:gap-8 xl:gap-12 2xl:gap-16">
        {/* Column 1: Brand & Contact */}
        <div className="space-y-6 lg:col-span-3">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-text-body md:max-w-md lg:max-w-full">
            {footerData.about}
          </p>
          <div className="pt-2 space-y-3">
            {contactDetail.map(({ data, href, icon: Icon }) => (
              <a
                key={data}
                href={href}
                className="flex items-center gap-3 text-sm transition-colors group text-text-body hover:text-brand-primary"
              >
                <Icon className="transition-colors text-text-muted group-hover:text-brand-primary" />
                <span className="font-medium">{data}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-6 lg:px-4 xl:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-y-10 lg:gap-x-4 xl:gap-x-8">
            {footerData.columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-bold font-heading text-text-main sm:text-base lg:text-sm xl:text-base">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="block text-sm transition-colors text-text-muted hover:text-brand-primary"
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

        {/* Column 3: Newsletter */}
        <div className="lg:col-span-3">
          <div className="max-w-md space-y-4 md:max-w-lg lg:max-w-none">
            <h4 className="flex items-center gap-2 text-base font-bold font-heading text-text-main">
              <FiSend className="text-brand-primary" />
              Stay in the loop
            </h4>
            <p className="text-sm leading-relaxed text-text-muted">
              Get updates on new arrivals and exclusive offers directly to your
              inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="relative flex flex-col pt-1 group"
            >
              {/* Reusing our Input Component */}
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startIcon={<FiMail />}
                className="py-2"
              />

              <button
                type="submit"
                className="px-3 py-3 mt-2 ml-auto text-xs font-bold uppercase transition-colors rounded-lg cursor-pointer bg-brand-primary hover:bg-brand-hover text-text-inverse tracking-wide sm:px-3 sm:py-4"
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
