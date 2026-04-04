import { z } from "zod";

// ---------- Auth ----------
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

// ---------- Hero ----------
export const heroSlideSchema = z.object({
  id: z.string(),
  image_url: z.string().min(1, "Image is required"),
  alt_text: z.string().optional(),
  headline: z.string().min(1, "Headline is required"),
  subheadline: z.string().optional(),
  cta_text: z.string().optional(),
  cta_link: z.string().optional(),
});
export const heroContentSchema = z.object({
  slides: z.array(heroSlideSchema).min(1, "Add at least one slide"),
});
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;

// ---------- About ----------
export const aboutContentSchema = z.object({
  headline: z.string().min(1),
  bio: z.string().min(1, "Bio text is required"),
  years_experience: z.coerce.number().min(0).optional(),
  location: z.string().optional(),
  photo_url: z.string().optional(),
  photo_alt: z.string().optional(),
});
export type AboutContent = z.infer<typeof aboutContentSchema>;

// Services removed — merged into Packages section

// ---------- Portfolio ----------
export const portfolioContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  show_category_filter: z.boolean().default(true),
});
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;

// ---------- Package ----------
export const packageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Package name is required"),
  price_inr: z.coerce.number().min(0, "Price must be positive"),
  badge: z.string().optional(),
  features: z.array(z.string()).min(1, "Add at least one feature"),
  is_highlighted: z.boolean().default(false),
  sort_order: z.number().default(0), // managed by drag-and-drop, not user input
});
export type PackageInput = z.infer<typeof packageSchema>;

export const addonSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Add-on name is required"),
  price_display: z.string().min(1, "Price display text is required"),
  price_from_inr: z.coerce.number().min(0),
  price_to_inr: z.coerce.number().min(0),
  description: z.string().optional(),
  sort_order: z.number().default(0),
});
export type AddonInput = z.infer<typeof addonSchema>;

// ---------- Testimonials ----------
export const testimonialSchema = z.object({
  id: z.string().optional(),
  client_name: z.string().min(1, "Client name is required"),
  review_text: z.string().min(10, "Review must be at least 10 characters"),
  photo_url: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).default(5),
  wedding_date: z.string().optional(),
  location: z.string().optional(),
  is_visible: z.boolean().default(true),
  sort_order: z.number().default(0),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;

// ---------- Reels ----------
export const reelItemSchema = z.object({
  id: z.string(),
  url: z.string().url("Enter a valid URL"),
  type: z.enum(["instagram", "video"]),
  thumbnail_url: z.string().optional(),
  caption: z.string().optional(),
});
export const reelsContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  items: z.array(reelItemSchema),
});
export type ReelsContent = z.infer<typeof reelsContentSchema>;
export type ReelItem = z.infer<typeof reelItemSchema>;

// ---------- Contact ----------
export const contactContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  maps_embed_url: z.string().optional(),
  form_recipient_email: z.string().email().optional().or(z.literal("")),
});
export type ContactContent = z.infer<typeof contactContentSchema>;

// ---------- Footer ----------
export const footerContentSchema = z.object({
  copyright_text: z.string().min(1),
  tagline: z.string().optional(),
  social_links: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    youtube: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  quick_links: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
});
export type FooterContent = z.infer<typeof footerContentSchema>;

// ---------- Site Settings ----------
export const siteSettingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  meta_description: z.string().max(160, "Meta description should be under 160 characters"),
  favicon_url: z.string().optional(),
});
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

// ---------- Media Upload ----------
export const mediaUploadSchema = z.object({
  section_id: z.string().optional(),
  category: z.enum(["wedding", "haldi", "prewedding", "cinematic", "other", "general"]).default("general"),
  alt_text: z.string().optional(),
  sort_order: z.number().default(0),
});
export type MediaUploadInput = z.infer<typeof mediaUploadSchema>;
