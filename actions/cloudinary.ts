"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadToCloudinary(
  formData: FormData,
  folder: string = "aksway"
): Promise<{ url: string; publicId: string } | { error: string }> {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided." };

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `aksway/${folder}`,
        resource_type: "auto",
        use_filename: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          resolve({ error: error?.message ?? "Cloudinary upload failed." });
        } else {
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      }
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<{ success: boolean } | { error: string }> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Cloudinary delete failed." };
  }
}
