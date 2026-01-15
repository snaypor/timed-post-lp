export const siteConfig = {
  name: "Timed Post",
  tagline: "Schedule your social media posts with ease",
  description: "The smart social media scheduler that helps you plan, create, and publish content across all platforms.",

  navLinks: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Platforms", href: "/platforms", hasDropdown: true },
    { label: "Blog", href: "/blog" },
    { label: "Free Tools", href: "/tools" },
  ],

  footerLinks: {
    product: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Blog", href: "/blog" },
    ],
    tools: [
      { label: "Bio Generator", href: "/tools/bio-generator" },
      { label: "Hashtag Generator", href: "/tools/hashtag-generator" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    support: [
      { label: "Contact", href: "/contact" },
    ],
  },

  cta: {
    primary: {
      text: "Start free",
      href: "/app",
    },
    secondary: {
      text: "Try free tools",
      href: "/tools",
    },
  },
};

export type SiteConfig = typeof siteConfig;

