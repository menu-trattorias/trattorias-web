import { Footer, Navbar } from "./Chrome";
import { WhatsAppFab } from "./Sections";
import type { Theme } from "@/data/content";

export function PageShell({
  theme,
  sub,
  jsonLd,
  waHref,
  phone,
  children,
}: {
  waHref?: string;
  /** Number shown in the footer; defaults to the common site number. */
  phone?: string;
  theme: Theme;
  sub?: string;
  jsonLd?: object;
  children: React.ReactNode;
}) {
  return (
    <div className={`theme-${theme}`}>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Navbar sub={sub} />
      <main>{children}</main>
      <Footer phone={phone} />
      {waHref && <WhatsAppFab href={waHref} />}
    </div>
  );
}
