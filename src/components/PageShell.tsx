import { Footer, Navbar } from "./Chrome";
import { WhatsAppFab } from "./Sections";
import type { Theme } from "@/data/content";

export function PageShell({
  theme,
  sub,
  jsonLd,
  waHref,
  children,
}: {
  waHref?: string;
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
      <Footer />
      {waHref && <WhatsAppFab href={waHref} />}
    </div>
  );
}
