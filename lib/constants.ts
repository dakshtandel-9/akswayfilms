// Section slugs — these map 1:1 to dashboard routes and DB records
export const SECTION_SLUGS = {
  HERO: "hero",
  ABOUT: "about",
  SERVICES: "services",
  PORTFOLIO: "portfolio",
  PACKAGES: "packages",
  TESTIMONIALS: "testimonials",
  REELS: "reels",
  CONTACT: "contact",
  FOOTER: "footer",
} as const;

export type SectionSlug = (typeof SECTION_SLUGS)[keyof typeof SECTION_SLUGS];

export const SECTION_LABELS: Record<SectionSlug, string> = {
  hero: "Hero Section",
  about: "About / Story",
  services: "Services",
  portfolio: "Portfolio / Gallery",
  packages: "Packages & Pricing",
  testimonials: "Testimonials",
  reels: "Instagram Reels",
  contact: "Contact",
  footer: "Footer",
};

// Media categories for portfolio management
export const MEDIA_CATEGORIES = [
  { value: "wedding", label: "Wedding" },
  { value: "haldi", label: "Haldi" },
  { value: "prewedding", label: "Pre-wedding" },
  { value: "cinematic", label: "Cinematic Film" },
  { value: "other", label: "Other" },
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]["value"];

// Max upload sizes
export const MAX_IMAGE_SIZE_MB = 10;
export const MAX_VIDEO_SIZE_MB = 100;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

// Accepted file types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/mov", "video/quicktime"];

// Business info defaults
export const BUSINESS_INFO = {
  name: "Aksway Photography",
  location: "Honnavar, Karnataka",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX",
};
