import type { Metadata } from "next";
import { PageShell } from "./PageShell";
import { Amenities, Book, Cta, DishMenu, Gallery, Hero, Nearby, Process, Ratings, Showcase, Split, Stats, Why } from "./Sections";
import { Faq } from "./Faq";
import { site, waLink, type BrandPage, type Theme } from "@/data/content";
import { breadcrumbSchema, businessSchema, faqSchema, graph } from "@/lib/seo";

/** Small label under the logo in the navbar on each property page. */
const NAV_LABEL: Partial<Record<Theme, string>> = { restaurant: "Restaurant", tranquil: "Tranquil", holiday: "Homestay" };

export function brandMetadata(b: BrandPage): Metadata {
  const images = [{ url: b.hero.slides[0], alt: `${b.name} — ${b.tagline}, Varkala` }];
  return {
    title: b.seo.title,
    description: b.seo.description,
    keywords: b.seo.keywords,
    alternates: { canonical: b.path },
    openGraph: { type: "website", siteName: "Trattorias Varkala", locale: "en_IN", title: b.seo.title, description: b.seo.description, url: b.path, images },
    twitter: { card: "summary_large_image", title: b.seo.title, description: b.seo.description, images: [b.hero.slides[0]] },
  };
}

/**
 * Shared section rhythm with business-specific sections:
 * restaurant → tabbed menu, stays → rooms, plus amenities, nearby, ratings and booking where data exists.
 */
export function BrandPageView({ b }: { b: BrandPage }) {
  const jsonLd = graph(
    businessSchema(b),
    faqSchema(b.faqs),
    breadcrumbSchema([
      { name: "Trattorias Varkala", path: "/" },
      { name: b.name, path: b.path },
    ])
  );

  const enquire = (label: string, topic: string) => ({
    label,
    href: waLink(b.whatsapp, `Hello! I'd like to enquire about ${topic} at ${b.name}.`),
  });
  const isStay = b.theme !== "restaurant";

  return (
    <PageShell phone={b.phone} theme={b.theme} sub={NAV_LABEL[b.theme]} jsonLd={jsonLd} waHref={waLink(b.whatsapp, `Hello! I'd like to enquire about ${b.name}.`)}>
      <Hero
        slides={b.hero.slides.map((image) => ({ image }))}
        title={b.hero.title}
        sub={b.hero.sub}
        cta={b.hero.cta}
        ctaHref={b.hero.href ?? waLink(b.whatsapp, `Hello! I'd like to book a stay at ${b.name}.`)}
        corner={b.hero.corner}
        stat={b.hero.stat}
        imagePosition={b.hero.imagePosition}
      />
      <Why {...b.why} />
      <Split {...b.split} wa={enquire("Enquire on WhatsApp", isStay ? "your rooms" : "the restaurant")} />

      {b.theme === "restaurant" ? (
        <DishMenu
          {...b.showcase}
          cta={
            b.showcase.cta ?? {
              label: "View Digital Menu",
              href: "https://trattorias.pages.dev/",
            }
          }
        />
      ) : (
        <Showcase
          {...b.showcase}
          items={b.showcase.items.map((c) => ({
            ...c,
            href: waLink(b.whatsapp, `Hello! I'd like to enquire about the ${c.title} at ${b.name}.`),
          }))}
          id="rooms"
          tint
          wa={enquire("Enquire About Rooms on WhatsApp", "rooms and availability")}
        />
      )}

      <Amenities {...b.amenities} wa={enquire("Ask Us on WhatsApp", "amenities and services")} />
      <Process {...b.process} />
      <Gallery {...b.gallery} />
      <div style={{ paddingBottom: 90 }}>
        <Stats items={b.stats} />
      </div>
      {b.nearby && <Nearby {...b.nearby} wa={enquire("Ask About the Area on WhatsApp", "the area and getting around")} />}
      {b.ratings && <Ratings {...b.ratings} />}
      {b.book && <Book {...b.book} />}
      <Faq title={`${b.name} — Frequently Asked Questions`} sub={`Quick answers about ${b.name} in Varkala, Kerala.`} faqs={b.faqs} />
      <Cta {...b.cta} href={b.cta.href ?? waLink(b.whatsapp, `Hello! I'd like to book a stay at ${b.name}.`)} image={b.cta.image ?? b.hero.slides[1] ?? b.hero.slides[0]} info={b.info} />
    </PageShell>
  );
}
