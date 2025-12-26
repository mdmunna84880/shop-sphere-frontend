import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const footerData = {
  about:
    "ShopSphere is your one-stop destination for quality products, secure payments, and fast delivery.",
  contact: {
    phone: "+0123 456 789",
    email: "support@shopsphere.com",
    address: "123 Commerce Street, Tech City, TC 90210",
  },
  columns: [
    {
      title: "Explore",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Shopping Guide", href: "/guide" },
        { name: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Returns", href: "/returns" },
        { name: "Shipping", href: "/shipping" },
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "Sign In", href: "/login" },
        { name: "My Cart", href: "/cart" },
        { name: "Track Order", href: "/track" },
        { name: "Help", href: "/help" },
      ],
    },
  ],
};

export const contactDetail = [
    {
      data: footerData.contact.phone,
      href: `tel:${footerData.contact.phone}`,
      icon: FiPhone,
    },
    {
      data: footerData.contact.email,
      href: `mailto:${footerData.contact.email}`,
      icon: FiMail,
    },
    {
      data: footerData.contact.address,
      href: `https://maps.app.goo.gl/VDk99CEBRomAdEHv9`,
      icon: FiMapPin,
    },

  ]