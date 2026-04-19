import { getSection } from "@/actions/sections";
import { getPackages, getAddons } from "@/actions/packages";
import { getTestimonials } from "@/actions/testimonials";
import { getMedia } from "@/actions/media";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import PackagesSection from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReelsSection from "@/components/ReelsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

import type {
  HeroContent,
  AboutContent,
  PortfolioContent,
  DriveAlbum,
  ReelsContent,
  ContactContent,
  FooterContent,
} from "@/lib/validations";

export const revalidate = 60;

const FALLBACK_SLIDES: HeroContent["slides"] = [
  {
    id: "fallback-1",
    image_url: "",
    alt_text: "Wedding photography by Aksway",
    headline: "Capturing Your Eternal Moments",
    subheadline: "Professional Wedding Photography in Honnavar",
    cta_text: "View Our Work",
    cta_link: "#portfolio",
  },
];

export default async function HomePage() {
  // Fetch all sections in parallel
  const [
    heroSection,
    aboutSection,
    portfolioSection,
    reelsSection,
    contactSection,
    footerSection,
    packages,
    addons,
    testimonials,
    portfolioMedia,
  ] = await Promise.all([
    getSection("hero"),
    getSection("about"),
    getSection("portfolio"),
    getSection("reels"),
    getSection("contact"),
    getSection("footer"),
    getPackages(),
    getAddons(),
    getTestimonials(),
    getMedia(),
  ]);

  // ── Hero ──────────────────────────────────────────
  const heroRaw = heroSection?.content as Record<string, unknown> | null;
  const slides: HeroContent["slides"] =
    heroRaw?.slides && Array.isArray(heroRaw.slides) && heroRaw.slides.length > 0
      ? (heroRaw.slides as HeroContent["slides"])
      : FALLBACK_SLIDES;

  // ── About ─────────────────────────────────────────
  const aboutContent = (aboutSection?.content ?? null) as AboutContent | null;

  // ── Portfolio ─────────────────────────────────────
  const portfolioRaw = portfolioSection?.content as Record<string, unknown> | null;
  const portfolioMeta: PortfolioContent = {
    headline: (portfolioRaw?.headline as string) ?? "Our Portfolio",
    subheadline: (portfolioRaw?.subheadline as string) ?? "A glimpse into our work",
    show_category_filter: (portfolioRaw?.show_category_filter as boolean) ?? true,
    drive_albums: (portfolioRaw?.drive_albums as DriveAlbum[]) ?? [],
  };
  const mediaItems = (portfolioMedia ?? []) as {
    id: string;
    public_url: string;
    alt_text?: string;
    category?: string;
  }[];

  // ── Reels ─────────────────────────────────────────
  const reelsContent = (reelsSection?.content ?? null) as ReelsContent | null;

  // ── Contact ───────────────────────────────────────
  const contactContent = (contactSection?.content ?? null) as ContactContent | null;

  // ── Footer ────────────────────────────────────────
  const footerContent = (footerSection?.content ?? null) as FooterContent | null;

  return (
    <main>
      <HeroSection slides={slides} />

      <AboutSection content={aboutContent} />

      <PortfolioSection
        headline={portfolioMeta.headline}
        subheadline={portfolioMeta.subheadline}
        items={mediaItems}
        showFilter={portfolioMeta.show_category_filter}
        driveAlbums={portfolioMeta.drive_albums}
      />

      <PackagesSection
        packages={packages as Parameters<typeof PackagesSection>[0]["packages"]}
        addons={addons as Parameters<typeof PackagesSection>[0]["addons"]}
      />

      <TestimonialsSection
        testimonials={testimonials as Parameters<typeof TestimonialsSection>[0]["testimonials"]}
      />

      {/* <ReelsSection content={reelsContent} /> */}

      <ContactSection content={contactContent} />

      <FooterSection content={footerContent} />
    </main>
  );
}
