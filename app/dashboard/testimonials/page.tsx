import { getTestimonials } from "@/actions/testimonials";
import { getSection } from "@/actions/sections";
import TestimonialsEditor from "@/components/dashboard/TestimonialsEditor";

export default async function TestimonialsPage() {
  const [testimonials, section] = await Promise.all([
    getTestimonials(),
    getSection("testimonials"),
  ]);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", fontFamily: "system-ui", fontSize: "0.875rem" }}>
          Manage client reviews. Add new testimonials, toggle visibility, and reorder.
        </p>
      </div>
      <TestimonialsEditor
        initialTestimonials={testimonials}
        hasDraft={section?.has_draft ?? false}
        publishedAt={section?.published_at ?? null}
      />
    </div>
  );
}
