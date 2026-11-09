import type { Metadata } from "next";
import { PageShell } from "./PageShell";
import { Amenities, Book, Cta, DishMenu, Gallery, Hero, Nearby, Process, Ratings, Showcase, Split, Stats, Why } from "./Sections";
import { site, waLink, type BrandPage } from "@/data/content";

export function brandMetadata(b: BrandPage): Metadata {
  return {
    title: b.seo.title,
    description: b.seo.description,
    alternates: { canonical: b.path },
    openGraph: { title: b.seo.title, description: b.seo.description, url: b.path, images: [{ url: b.hero.slides[0] }] },
  };
}

const schemaType = { tranquil: "BedAndBreakfast", restaurant: "Restaurant", holiday: "LodgingBusiness", home: "Organization" };

/**
 * Shared section rhythm with business-specific sections:
 * restaurant → tabbed menu, stays → rooms, plus amenities, nearby, ratings and booking where data exists.
 */
export function BrandPageView({ b }: { b: BrandPage }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType[b.theme],
    name: b.name,
    description: b.seo.description,
    image: b.hero.slides[0],
    url: site.url + b.path,
    ...(b.phone && { telephone: b.phone }),
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: "Varkala", addressRegion: "Kerala", addressCountry: "IN" },
    ...(b.theme === "restaurant" && { servesCuisine: ["Italian", "Tibetan", "Thai", "Pan-Asian", "Oriental", "Continental", "Kerala seafood"] }),
  };

  const enquire = (label: string, topic: string) => ({
    label,
    href: waLink(b.whatsapp, `Hello! I'd like to enquire about ${topic} at ${b.name}.`),
  });
  const isStay = b.theme !== "restaurant";

  return (
    <PageShell theme={b.theme} sub={b.tagline} jsonLd={jsonLd} waHref={waLink(b.whatsapp, `Hello! I'd like to enquire about ${b.name}.`)}>
      <Hero
        slides={b.hero.slides.map((image) => ({ image }))}
        title={b.hero.title}
        sub={b.hero.sub}
        cta={b.hero.cta}
        ctaHref={b.hero.href ?? waLink(b.whatsapp, `Hello! I'd like to book a stay at ${b.name}.`)}
        corner={b.hero.corner}
        stat={b.hero.stat}
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
      <Cta {...b.cta} href={b.cta.href ?? waLink(b.whatsapp, `Hello! I'd like to book a stay at ${b.name}.`)} image={b.cta.image ?? b.hero.slides[1] ?? b.hero.slides[0]} info={b.info} />
    </PageShell>
  );
}
