import { getPackages, getAddons } from "@/actions/packages";
import PackagesEditor from "@/components/dashboard/PackagesEditor";

export default async function PackagesPage() {
  const [packages, addons] = await Promise.all([getPackages(), getAddons()]);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Edit your 3 pricing packages and add-on services. Changes are live immediately on publish.
        </p>
      </div>
      <PackagesEditor initialPackages={packages} initialAddons={addons} />
    </div>
  );
}
