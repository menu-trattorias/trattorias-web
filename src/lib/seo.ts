import { brands, site, type BrandPage } from "@/data/content";

const abs = (p: string) => (p.startsWith("http") ? p : site.url + p);

export const orgId = `${site.url}/#organization`;
export const businessId = (b: BrandPage) => `${site.url}${b.path}#business`;

const schemaType = {
  tranquil: "BedAndBreakfast",
  restaurant: "Restaurant",
  holiday: "LodgingBusiness",
  home: "Organization",
} as const;

/** Site-wide nodes: the Trattorias group + the website. Rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Trattorias Varkala",
        alternateName: "Trattorias",
        url: site.url,
        telephone: site.phone,
        description:
          "Trattorias is a Varkala, Kerala hospitality group: a cliff-top restaurant on North End Cliff, Trattorias Holiday Homes near North Cliff and Trattorias Tranquil near Odayam Beach.",
        address: { "@type": "PostalAddress", addressLocality: "Varkala", addressRegion: "Kerala", addressCountry: "IN" },
        areaServed: "Varkala, Kerala, India",
        contactPoint: { "@type": "ContactPoint", telephone: site.phone, contactType: "reservations", areaServed: "IN", availableLanguage: ["English", "Malayalam", "Hindi"] },
        subOrganization: brands.map((b) => ({ "@id": businessId(b) })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: "Trattorias Varkala",
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** One business (Restaurant / BedAndBreakfast / LodgingBusiness) with all confirmed facts. */
export function businessSchema(b: BrandPage) {
  const s = b.schema;
  const isRestaurant = b.theme === "restaurant";
  const images = [...new Set([...b.hero.slides, ...b.gallery.tiles.slice(0, 5).map((t) => t.src)])].map(abs);
  return {
    "@type": schemaType[b.theme],
    "@id": businessId(b),
    name: b.name,
    description: b.seo.description,
    url: abs(b.path),
    image: images,
    telephone: b.phone ?? site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: "Varkala",
      addressRegion: "Kerala",
      addressCountry: "IN",
      ...(b.address.match(/\b\d{6}\b/) && { postalCode: b.address.match(/\b\d{6}\b/)![0] }),
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name}, ${b.address}`)}`,
    areaServed: "Varkala, Kerala",
    keywords: b.seo.keywords.join(", "),
    parentOrganization: { "@id": orgId },
    amenityFeature: s.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    ...(s.sameAs.length && { sameAs: s.sameAs }),
    ...(s.nearby.length && { containedInPlace: { "@type": "Place", name: "Varkala, Kerala, India" } }),
    ...(s.rooms && { numberOfRooms: s.rooms }),
    ...(s.checkin && { checkinTime: s.checkin }),
    ...(s.checkout && { checkoutTime: s.checkout }),
    ...(s.hours && {
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: s.hours.open,
        closes: s.hours.close,
      },
    }),
    ...(isRestaurant && {
      servesCuisine: ["Italian", "Tibetan", "Thai", "Pan-Asian", "Japanese", "Continental", "Kerala seafood", "Indian"],
      acceptsReservations: true,
    }),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
