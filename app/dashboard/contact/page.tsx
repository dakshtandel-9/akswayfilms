import { getSection } from "@/actions/sections";
import ContactEditor from "@/components/dashboard/ContactEditor";
import type { ContactContent } from "@/lib/validations";

const defaultContent: ContactContent = {
  headline: "Let's Connect",
  subheadline: "Reach out to book your date",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Honnavar, Karnataka",
  maps_embed_url: "",
  form_recipient_email: "",
};

export default async function ContactPage() {
  const section = await getSection("contact");
  const content = (section?.content ?? defaultContent) as ContactContent;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Update your contact details — phone, WhatsApp, email, address and maps embed.
        </p>
      </div>
      <ContactEditor
        initialContent={content}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
