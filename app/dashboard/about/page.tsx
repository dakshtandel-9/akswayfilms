import { getSection } from "@/actions/sections";
import AboutEditor from "@/components/dashboard/AboutEditor";
import type { AboutContent } from "@/lib/validations";

const defaultContent: AboutContent = {
  headline: "Our Story",
  bio: "Based in Honnavar, we specialize in capturing the raw emotions and candid moments of your wedding day.",
  years_experience: 5,
  location: "Honnavar, Karnataka",
  photo_url: "",
  photo_alt: "Photographer",
};

export default async function AboutPage() {
  const section = await getSection("about");
  const content = (section?.content ?? defaultContent) as AboutContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Tell your story — this section builds trust with potential clients.
        </p>
      </div>
      <AboutEditor
        initialContent={content}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
