/** Server-rendered FAQ (native <details>) — fully crawlable, mirrors the FAQPage structured data. */
export function Faq({ title, sub, faqs }: { title: string; sub?: string; faqs: { q: string; a: string }[] }) {
  return (
    <section className="section tint faq" id="faq">
      <div className="container faq-wrap">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
