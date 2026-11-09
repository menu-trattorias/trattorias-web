import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactView } from "@/components/ContactView";
import { site, waLink } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Us & Direct Enquiries — Trattorias Varkala",
  description:
    "Get in touch with Trattorias Varkala for room reservations at Tranquil and Holiday Homes, cliff-top restaurant dining, or local travel advice. Connect directly on WhatsApp or call +91 97469 68992.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Us — Trattorias Varkala",
    description:
      "Get in touch with Trattorias Varkala. Reserve rooms, book cliff-top dinner tables, and connect directly on WhatsApp.",
    url: `${site.url}/contact/`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Trattorias Varkala",
    url: `${site.url}/contact/`,
    telephone: site.phone,
    mainEntity: {
      "@type": "Organization",
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

