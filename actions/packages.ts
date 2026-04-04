"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PackageInput, AddonInput } from "@/lib/validations";

// ---- PACKAGES ----

export async function getPackages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function createPackage(input: PackageInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").insert({
    name: input.name,
    price_inr: input.price_inr,
    badge: input.badge,
    features: input.features,
    is_highlighted: input.is_highlighted,
    sort_order: input.sort_order,
    updated_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function updatePackage(id: string, input: PackageInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update({
      name: input.name,
      price_inr: input.price_inr,
      badge: input.badge,
      features: input.features,
      is_highlighted: input.is_highlighted,
      sort_order: input.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function deletePackage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function reorderPackages(orderedIds: string[]) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("packages").update({ sort_order: index + 1 }).eq("id", id)
  );
  await Promise.all(updates);
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

// ---- ADD-ONS ----

export async function getAddons() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addons")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function createAddon(input: AddonInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("addons").insert({
    name: input.name,
    price_display: input.price_display,
    price_from_inr: input.price_from_inr,
    price_to_inr: input.price_to_inr,
    description: input.description,
    sort_order: input.sort_order,
    updated_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function updateAddon(id: string, input: AddonInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("addons")
    .update({
      name: input.name,
      price_display: input.price_display,
      price_from_inr: input.price_from_inr,
      price_to_inr: input.price_to_inr,
      description: input.description,
      sort_order: input.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function deleteAddon(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("addons").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}

export async function reorderAdons(orderedIds: string[]) {
  const supabase = await createClient();
  const updates = orderedIds.map((id, index) =>
    supabase.from("addons").update({ sort_order: index + 1 }).eq("id", id)
  );
  await Promise.all(updates);
  revalidatePath("/");
  revalidatePath("/dashboard/packages");
  return { success: true };
}
