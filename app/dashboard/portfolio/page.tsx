import { getSection } from "@/actions/sections";
import { getMedia } from "@/actions/media";
import PortfolioEditor from "@/components/dashboard/PortfolioEditor";
import type { PortfolioContent } from "@/lib/validations";

const defaultContent: PortfolioContent = {
  headline: "Our Work",
  subheadline: "A glimpse into the stories we have told",
  show_category_filter: true,
};

export default async function PortfolioPage() {
  const [section, mediaItems] = await Promise.all([
    getSection("portfolio"),
    getMedia(),
  ]);
  const content = (section?.content ?? defaultContent) as PortfolioContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Upload, organise, and manage all your portfolio photos and videos. Drag to reorder.
        </p>
      </div>
      <PortfolioEditor
        initialContent={content}
        initialMedia={mediaItems}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
