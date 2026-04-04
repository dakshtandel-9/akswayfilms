"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettingsInput } from "@/lib/validations";

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").single();
  if (error) return null;
  return data;
}

export async function updateSiteSettings(input: SiteSettingsInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({
      site_title: input.site_title,
      meta_description: input.meta_description,
      favicon_url: input.favicon_url,
      updated_at: new Date().toISOString(),
    })
    .neq("id", "00000000-0000-0000-0000-000000000000"); // update the single row

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateSocialLinks(links: {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({
      social_links: links,
      updated_at: new Date().toISOString(),
    })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/settings");
  return { success: true };
}
