import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInr: number): string {
  if (priceInr >= 100000) {
    return `₹${(priceInr / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  }
  if (priceInr >= 1000) {
    return `₹${(priceInr / 1000).toFixed(0)}K`;
  }
  return `₹${priceInr.toLocaleString("en-IN")}`;
}

export function formatPriceRange(from: number, to: number): string {
  if (from === to) return formatPrice(from);
  return `${formatPrice(from)} – ${formatPrice(to)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
