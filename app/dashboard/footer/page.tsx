import { getSection } from "@/actions/sections";
import FooterEditor from "@/components/dashboard/FooterEditor";
import type { FooterContent } from "@/lib/validations";

const defaultContent: FooterContent = {
  copyright_text: "© 2025 Aksway Photography. All rights reserved.",
  tagline: "Capturing Love Stories in Honnavar",
  social_links: { instagram: "", facebook: "", youtube: "", whatsapp: "" },
  quick_links: [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ],
};

export default async function FooterPage() {
  const section = await getSection("footer");
  const content = (section?.content ?? defaultContent) as FooterContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Manage footer content — social links, copyright, tagline, and quick nav links.
        </p>
      </div>
      <FooterEditor
        initialContent={content}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
