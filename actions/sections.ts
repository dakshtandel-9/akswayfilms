"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SectionSlug } from "@/lib/constants";

// Fetch a single section's published content
export async function getSection(slug: SectionSlug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

// Fetch ALL sections (for landing page, ordered by sort_order)
export async function getAllSections() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data;
}

// Save draft content (does NOT publish)
export async function saveDraft(slug: SectionSlug, content: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sections")
    .update({
      draft_content: content,
      has_draft: true,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

// Publish — copies draft_content to content and marks as published
export async function publishSection(slug: SectionSlug) {
  const supabase = await createClient();

  // First get the draft content
  const { data: section, error: fetchError } = await supabase
    .from("sections")
    .select("draft_content")
    .eq("slug", slug)
    .single();

  if (fetchError || !section?.draft_content) {
    return { error: "No draft content to publish." };
  }

  // Publish: copy draft to content
  const { error } = await supabase
    .from("sections")
    .update({
      content: section.draft_content,
      draft_content: null,
      has_draft: false,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Save AND publish immediately (single-step)
export async function saveAndPublishSection(slug: SectionSlug, content: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sections")
    .update({
      content,
      draft_content: null,
      has_draft: false,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Toggle section visibility
export async function toggleSectionVisibility(slug: SectionSlug, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sections")
    .update({ is_visible: isVisible, updated_at: new Date().toISOString() })
    .eq("slug", slug);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}
