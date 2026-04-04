import { getSiteSettings } from "@/actions/settings";
import SettingsEditor from "@/components/dashboard/SettingsEditor";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Update site-wide settings — SEO title, meta description, and social media links.
        </p>
      </div>
      <SettingsEditor initialSettings={settings} />
    </div>
  );
}
