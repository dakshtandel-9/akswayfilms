import { getSection } from "@/actions/sections";
import HeroEditor from "@/components/dashboard/HeroEditor";
import type { HeroContent } from "@/lib/validations";

const defaultContent: HeroContent = {
  slides: [
    {
      id: "default-1",
      image_url: "",
      alt_text: "Wedding couple at golden hour",
      headline: "Capturing Your Eternal Moments",
      subheadline: "Professional Wedding Photography in Honnavar",
      cta_text: "View Our Work",
      cta_link: "#portfolio",
    },
  ],
};

export default async function HeroPage() {
  const section = await getSection("hero");
  const raw = section?.content as Record<string, unknown> | null;

  // Handle legacy content (pre-slides format) gracefully
  const content: HeroContent =
    raw?.slides && Array.isArray(raw.slides) && raw.slides.length > 0
      ? (raw as HeroContent)
      : defaultContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Upload background images for the hero section. Each slide has its own heading, subheading and call-to-action button.
        </p>
      </div>
      <HeroEditor
        initialContent={content}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
