"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MediaUploadInput } from "@/lib/validations";

// Fetch all media, optionally filtered by section or category
export async function getMedia(filters?: { sectionId?: string; category?: string }) {
  const supabase = await createClient();
  let query = supabase.from("media").select("*").order("sort_order", { ascending: true });
  if (filters?.sectionId) query = query.eq("section_id", filters.sectionId);
  if (filters?.category) query = query.eq("category", filters.category);
  const { data, error } = await query;
  if (error) return [];
  return data;
}

// Save media record after upload (URL comes from Supabase Storage)
export async function saveMediaRecord(
  publicUrl: string,
  storagePath: string,
  fileName: string,
  mediaType: "image" | "video",
  fileSizeBytes: number,
  meta: MediaUploadInput
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .insert({
      section_id: meta.section_id || null,
      file_name: fileName,
      storage_path: storagePath,
      public_url: publicUrl,
      media_type: mediaType,
      category: meta.category,
      sort_order: meta.sort_order,
      alt_text: meta.alt_text || "",
      file_size_bytes: fileSizeBytes,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true, media: data };
}

// Delete a media record AND the underlying storage file
export async function deleteMedia(id: string, storagePath: string) {
  const supabase = await createClient();

  // Remove from storage
  const { error: storageError } = await supabase.storage
    .from("aksway-media")
    .remove([storagePath]);

  if (storageError) {
    console.error("Storage delete error:", storageError);
    // Continue even if storage delete fails — remove DB record
  }

  // Remove DB record
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Update alt text or category for a media item
export async function updateMediaMeta(
  id: string,
  updates: { alt_text?: string; category?: string; sort_order?: number }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("media").update(updates).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Reorder media items
export async function reorderMedia(orderedIds: string[]) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("media").update({ sort_order: index + 1 }).eq("id", id)
  );
  await Promise.all(updates);
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Get a signed upload URL (for large files using TUS protocol)
export async function getSignedUploadUrl(fileName: string, contentType: string) {
  const supabase = await createClient();
  const path = `uploads/${Date.now()}-${fileName}`;
  const { data, error } = await supabase.storage
    .from("aksway-media")
    .createSignedUploadUrl(path);

  if (error) return { error: error.message };
  return { signedUrl: data.signedUrl, token: data.token, path };
}
