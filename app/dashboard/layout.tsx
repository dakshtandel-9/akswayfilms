import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double-check auth server-side (middleware already handles redirect)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <DashboardHeader userEmail={user.email ?? ""} />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem",
            background: "#0A0A0A",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
