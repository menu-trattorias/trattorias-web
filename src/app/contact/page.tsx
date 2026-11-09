import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactView } from "@/components/ContactView";
import { site, waLink } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us & Direct Enquiries — Trattorias Varkala",
  description:
    "Get in touch with Trattorias Varkala for room reservations at Tranquil and Holiday Homes, cliff-top restaurant dining, or local travel advice. Connect directly on WhatsApp or call +91 97469 68992.",
  keywords: ["contact Trattorias Varkala", "Varkala restaurant reservations", "book homestay Varkala", "Varkala WhatsApp booking", "Varkala hotel phone number"],
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    siteName: "Trattorias Varkala",
    title: "Contact Us — Trattorias Varkala",
    description:
      "Get in touch with Trattorias Varkala. Reserve rooms, book cliff-top dinner tables, and connect directly on WhatsApp.",
    url: `${site.url}/contact/`,
    images: [{ url: "/images/restaurant/restaurant-hero.webp", alt: "Trattorias Varkala — contact for restaurant, Holiday Homes and Tranquil" }],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Trattorias Varkala",
    url: `${site.url}/contact/`,
    telephone: site.phone,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trattorias Varkala", item: site.url + "/" },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact/` },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "Trattorias Varkala",
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressLocality: "Varkala",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
  };

  return (
    <PageShell
      theme="home"
      sub="Contact & Enquiries"
      jsonLd={jsonLd}
      waHref={waLink(site.phone, "Hello! I'd like to get in touch with Trattorias Varkala.")}
    >
      <ContactView />
    </PageShell>
  );
}

