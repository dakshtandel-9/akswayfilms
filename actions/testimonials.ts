"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TestimonialInput } from "@/lib/validations";

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    client_name: input.client_name,
    review_text: input.review_text,
    photo_url: input.photo_url,
    rating: input.rating,
    wedding_date: input.wedding_date,
    location: input.location,
    is_visible: input.is_visible,
    sort_order: input.sort_order,
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      client_name: input.client_name,
      review_text: input.review_text,
      photo_url: input.photo_url,
      rating: input.rating,
      wedding_date: input.wedding_date,
      location: input.location,
      is_visible: input.is_visible,
      sort_order: input.sort_order,
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

export async function toggleTestimonialVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_visible: isVisible })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

export async function reorderTestimonials(orderedIds: string[]) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("testimonials").update({ sort_order: index + 1 }).eq("id", id)
  );
  await Promise.all(updates);
  revalidatePath("/");
  revalidatePath("/dashboard/testimonials");
  return { success: true };
}
