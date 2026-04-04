import { getSection } from "@/actions/sections";
import ReelsEditor from "@/components/dashboard/ReelsEditor";
import type { ReelsContent } from "@/lib/validations";

const defaultContent: ReelsContent = {
  headline: "Follow Our Journey",
  subheadline: "Find us on Instagram for more wedding stories",
  items: [],
};

export default async function ReelsPage() {
  const section = await getSection("reels");
  const content = (section?.content ?? defaultContent) as ReelsContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Add Instagram reel URLs or uploaded video links to showcase on your website.
        </p>
      </div>
      <ReelsEditor
        initialContent={content}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
