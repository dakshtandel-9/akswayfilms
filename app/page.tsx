import HeroSection         from "@/components/HeroSection";
import AboutSection        from "@/components/AboutSection";
import PortfolioSection    from "@/components/PortfolioSection";
import PackagesSection     from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection      from "@/components/ContactSection";
import FooterSection       from "@/components/FooterSection";

import heroData     from "@/data/hero.json";
import aboutData    from "@/data/about.json";
import workData     from "@/data/work.json";
import packagesData from "@/data/packages.json";
import reviewsData  from "@/data/reviews.json";

import type {
  HeroContent,
  AboutContent,
} from "@/lib/validations";

export default function HomePage() {
  const slides = heroData.slides as HeroContent["slides"];
  const aboutContent = aboutData as AboutContent;

  return (
    <main>
      <HeroSection slides={slides} />

      <AboutSection content={aboutContent} />

      <PortfolioSection
        headline={workData.headline}
        subheadline={workData.subheadline}
        items={workData.items}
        showFilter={workData.show_category_filter}
        driveAlbums={workData.drive_albums}
      />

      <PackagesSection
        packages={packagesData.packages as Parameters<typeof PackagesSection>[0]["packages"]}
        addons={packagesData.addons as Parameters<typeof PackagesSection>[0]["addons"]}
      />

      <TestimonialsSection
        testimonials={reviewsData.testimonials as Parameters<typeof TestimonialsSection>[0]["testimonials"]}
      />

      <ContactSection content={null} />

      <FooterSection content={null} />
    </main>
  );
}
