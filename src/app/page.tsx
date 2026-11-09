import { PageShell } from "@/components/PageShell";
import { Cta, Gallery, HomeHero, MarqueeBand, Process, Ratings, Showcase, Split, Stats, Why } from "@/components/Sections";
import { brands, home, site, waLink } from "@/data/content";
import { img } from "@/data/images";
import { Faq } from "@/components/Faq";
import { businessSchema, faqSchema, graph } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  keywords: home.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Trattorias Varkala",
    locale: "en_IN",
    title: home.seo.title,
    description: home.seo.description,
    url: "/",
    images: [{ url: img.restaurantHero, alt: "Trattorias Varkala — sea-view cliff restaurant, homestay and B&B in Varkala, Kerala" }],
  },
  twitter: { card: "summary_large_image", title: home.seo.title, description: home.seo.description, images: [img.restaurantHero] },
};

export default function HomePage() {
  const jsonLd = graph(
    { "@type": "WebPage", "@id": `${site.url}/#webpage`, url: site.url, name: home.seo.title, description: home.seo.description, isPartOf: { "@id": `${site.url}/#website` }, about: { "@id": `${site.url}/#organization` } },
    ...brands.map(businessSchema),
    faqSchema(home.faqs)
  );

  return (
    <PageShell theme="home" sub="Varkala · Kerala" jsonLd={jsonLd} waHref={waLink(site.phone, "Hello! I'd like to enquire about Trattorias Varkala.")}>
      <HomeHero
        title="Eat, Stay & Unwind in Varkala"
        sub="A cliff-top restaurant, a peaceful homestay near North Cliff and a garden-view stay by Odayam Beach — all in Varkala, Kerala."
        cta="Explore Trattorias"
        ctaHref="#brands"
        cards={{
          dark: { src: img.holidaySunlitPalms, alt: "Trattorias Holiday Homes sunlit bedroom overlooking palm trees", href: "/holiday-home/" },
          photoA: { src: img.clubSandwich, alt: "Trattorias Restaurant grilled club sandwich with fries", href: "/restaurant/" },
          note: { src: img.tranquilDiningPatio, alt: "Trattorias Tranquil dining and breakfast patio", href: "/tranquil/" },
          titled: { src: img.holidayPurpleDeluxeBalcony, alt: "Trattorias Holiday Homes deluxe bedroom with balcony", href: "/holiday-home/" },
          photoB: { src: img.tranquilVillaExterior, alt: "Trattorias Tranquil villa courtyard and garden", href: "/tranquil/" },
        }}
      />
      <Why {...home.why} />

      <Showcase
        id="brands"
        eyebrow="Our places"
        title="Discover the Trattorias *Family*"
        sub="Three places, one warm welcome. Choose where to begin."
        tint
        items={brands.map((b) => ({
          title: b.name,
          text: b.blurb,
          image:
            b.theme === "restaurant"
              ? img.restaurantHero
              : b.theme === "holiday"
              ? img.holidayModernVillaCourtyard
              : img.tranquilPoolAerial,
          tag: b.tagline,
          href: b.path,
          brand: b.theme,
        }))}
      />

      <Split {...home.split} reverse wa={{ label: "Enquire on WhatsApp", href: waLink(site.phone, "Hello! I'd like to know more about Trattorias Varkala.") }} />
      <Process {...home.process} />
      <Gallery eyebrow="Gallery" title="Life at *Trattorias*" sub="Good food, sea views and slow days." tiles={home.gallery} />
      <Stats
        items={[
          { to: 3, label: "Places to eat & stay" },
          { to: 13, label: "Guest rooms across two stays" },
          { to: 1100, suffix: "+", label: "Restaurant reviews" },
          { to: 4.2, decimals: 1, label: "Holiday Homes rating" },
        ]}
      />
      <MarqueeBand images={home.marquee} />
      <Ratings {...home.ratings} />
      <Faq title="Trattorias Varkala — Frequently Asked Questions" sub="Where to eat and stay in Varkala, Kerala." faqs={home.faqs} />
      <Cta
        eyebrow={home.cta.eyebrow}
        title={home.cta.title}
        sub={home.cta.sub}
        button="Get in Touch"
        href={waLink(site.phone, "Hello! I'd like help planning a holiday in Varkala with Trattorias.")}
        image={img.holidaySunsetBeach}
      />
    </PageShell>
  );
}
