import { getSection } from "@/actions/sections";
import HeroSection from "@/components/HeroSection";
import type { HeroContent } from "@/lib/validations";

export const revalidate = 60; // ISR: revalidate every 60 seconds

const fallbackSlides: HeroContent["slides"] = [
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
  const section = await getSection("hero");
  const raw = section?.content as Record<string, unknown> | null;

  const slides: HeroContent["slides"] =
    raw?.slides && Array.isArray(raw.slides) && raw.slides.length > 0
      ? (raw.slides as HeroContent["slides"])
      : fallbackSlides;

  return (
    <main>
      <HeroSection slides={slides} />
    </main>
  );
}
