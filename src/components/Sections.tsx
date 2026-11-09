"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Counter, Marquee, Parallax, Reveal, SplitText, Stagger, StaggerItem } from "./motion";
import { tel, whatsapp, type AmenityGroup, type Card, type Feature, type Score, type Tile } from "@/data/content";
import { img } from "@/data/images";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- Shared bits ---------------- */
export function Btn({ href, children, variant = "light", icon }: { href: string; children: React.ReactNode; variant?: "light" | "accent"; icon?: IconName }) {
  const isPhone = href.startsWith("tel:");
  const resolvedIcon = icon ?? (isPhone ? "Phone" : "ArrowUpRight");
  const dot = (
    <span className="btn-dot">
      <Icon name={resolvedIcon} size={16} />
    </span>
  );
  if (/^(https?:|tel:|mailto:)/.test(href))
    return (
      <a href={href} className={`btn btn-${variant}`} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
        {dot}
      </a>
    );
  return (
    <Link href={href} className={`btn btn-${variant}`}>
      {children}
      {dot}
    </Link>
  );
}

export function SectionHead({ title, sub, eyebrow }: { title: string; sub?: string; eyebrow?: string }) {
  return (
    <div className="section-head">
      {eyebrow && (
        <Reveal y={16}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <SplitText text={title} />
      {sub && (
        <Reveal delay={0.2} y={20}>
          <p>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Official WhatsApp glyph. */
export function WhatsAppLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Green WhatsApp enquiry button. */
export function WaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
      {children}
      <span className="btn-dot">
        <WhatsAppLogo size={17} />
      </span>
    </a>
  );
}

export type Wa = { href: string; label: string };
const WaRow = ({ wa }: { wa?: Wa }) =>
  wa ? (
    <Reveal y={20} className="wa-row">
      <WaButton href={wa.href}>{wa.label}</WaButton>
    </Reveal>
  ) : null;

/* ---------------- Hero ---------------- */
type Slide = { image: string; title?: string; brand?: string };

export function Hero({
  slides,
  title,
  sub,
  cta,
  ctaHref = "#contact",
  corner,
  stat,
  booking = false,
}: {
  slides: Slide[];
  title?: string;
  sub: string;
  cta: string;
  ctaHref?: string;
  corner: string;
  stat?: { label: string; to: number; prefix?: string; suffix?: string; decimals?: number };
  booking?: boolean;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);
  const current = slides[i];
  const heading = current.title ?? title ?? "";

  return (
    <div className="hero-wrap">
      <section className="hero" ref={ref}>
        <motion.div className="hero-media" style={{ y }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.brand ?? heading.replace("\n", " ").replace(/\*/g, "")}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1.02 }}
              // keep the old slide fully visible underneath until the new one has faded in
              exit={{ opacity: 0, transition: { delay: 1.2, duration: 0.01 } }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: "linear" } }}
              style={{ position: "absolute", inset: 0 }}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </AnimatePresence>
        </motion.div>

        <motion.div className="hero-content" style={{ opacity: fade }}>
          {current.brand && (
            <motion.span
              key={"b" + i}
              className="eyebrow"
              style={{ background: "rgba(255,255,255,.2)", color: "#fff", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {current.brand}
            </motion.span>
          )}
          <SplitText key={heading} text={heading} as="h1" immediate delay={0.2} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
            {sub}
          </motion.p>
          {!booking && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
              <Btn href={ctaHref}>{cta}</Btn>
            </motion.div>
          )}
        </motion.div>

        {slides.length > 1 && (
          <motion.div
            className="hero-dots-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={booking ? { bottom: 110 } : undefined}
          >
            <div className="hero-dots">
              {slides.map((_, k) => (
                <span key={k} className={k === i ? "on" : ""} />
              ))}
            </div>
          </motion.div>
        )}

      </section>
    </div>
  );
}

/* ---------------- Home hero (centered headline + staggered card row) ---------------- */
export function HomeHero({
  title,
  sub,
  cta,
  ctaHref,
  cards,
}: {
  title: string;
  sub: string;
  cta: string;
  ctaHref: string;
  cards: {
    dark: { src: string; alt: string; href: string };
    photoA: { src: string; alt: string; href?: string };
    note: { src: string; alt: string; href: string };
    titled: { src: string; alt: string; href: string };
    photoB: { src: string; alt: string; href?: string };
  };
}) {
  const up = (d: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d, duration: 0.8, ease },
  });
  return (
    <section className="home-hero">
      <div className="container">
        <div className="hh-text">
          <SplitText text={title} as="h1" immediate delay={0.1} />
          <motion.p {...up(0.5)}>{sub}</motion.p>
          <motion.div {...up(0.65)}>
            <Link href={ctaHref} className="hh-btn">
              {cta}
            </Link>
          </motion.div>
        </div>

        <div className="hh-cards">
          <motion.div className="hh-card hh-photo hh-first" {...up(0.9)}>
            <img src={cards.dark.src} alt={cards.dark.alt} />
            <Link href={cards.dark.href} className="hh-hit" aria-label={cards.dark.alt} />
          </motion.div>
          <motion.div className="hh-card hh-photo hh-a" {...up(1.0)}>
            <img src={cards.photoA.src} alt={cards.photoA.alt} />
            {cards.photoA.href && <Link href={cards.photoA.href} className="hh-hit" aria-label={cards.photoA.alt} />}
          </motion.div>
          <motion.div className="hh-card hh-photo hh-c" {...up(1.1)}>
            <img src={cards.note.src} alt={cards.note.alt} />
            <Link href={cards.note.href} className="hh-hit" aria-label={cards.note.alt} />
          </motion.div>
          <motion.div className="hh-card hh-photo hh-d" {...up(1.2)}>
            <img src={cards.titled.src} alt={cards.titled.alt} />
            <Link href={cards.titled.href} className="hh-hit" aria-label={cards.titled.alt} />
          </motion.div>
          <motion.div className="hh-card hh-photo hh-b" {...up(1.3)}>
            <img src={cards.photoB.src} alt={cards.photoB.alt} />
            {cards.photoB.href && <Link href={cards.photoB.href} className="hh-hit" aria-label={cards.photoB.alt} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why (3-column feature grid) ---------------- */
export function Why({ eyebrow, title, sub, items }: { eyebrow?: string; title: string; sub: string; items: Feature[] }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Stagger className="why-grid">
          {items.map((f) => (
            <StaggerItem key={f.title} className="why-card">
              {f.image && (
                <div className="why-img">
                  <img src={f.image} alt={f.title} loading="lazy" />
                </div>
              )}
              <motion.span className="icon-badge" whileHover={{ rotate: 20, scale: 1.1 }}>
                <Icon name={f.icon} />
              </motion.span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Split → bento grid whose cards fly in on scroll ---------------- */
function Bento({
  p,
  from,
  start,
  k,
  className,
  children,
}: {
  p: MotionValue<number>;
  from: { x: number; y: number; r: number; s: number };
  start: number;
  k: number;
  className: string;
  children: React.ReactNode;
}) {
  const end = start + 0.4;
  const x = useTransform(p, [start, end], [from.x * k, 0]);
  const y = useTransform(p, [start, end], [from.y * (k === 0 ? 0.3 : k), 0]);
  const rotate = useTransform(p, [start, end], [from.r * k, 0]);
  const scale = useTransform(p, [start, end], [k === 0 ? 0.95 : from.s, 1]);
  const opacity = useTransform(p, [start, start + 0.14], [0, 1]);
  return (
    <motion.div className={`bento ${className}`} style={{ x, y, rotate, scale, opacity }}>
      {children}
    </motion.div>
  );
}

export function Split({
  title,
  sub,
  image,
  badge,
  features,
  id,
  wa,
}: {
  wa?: Wa;
  title: string;
  sub: string;
  image: string;
  badge?: { value: string; label: string };
  features: Feature[];
  reverse?: boolean;
  id?: string;
}) {
  const grid = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: grid, offset: ["start 92%", "center 52%"] });
  const imgScale = useTransform(p, [0, 1], [1.25, 1]);
  const imgY = useTransform(p, [0, 1], ["-6%", "6%"]);
  const [f1, f2, f3, f4] = features;
  // spread distance scales down on small screens (suppress horizontal spread under 860px to prevent overflow)
  const [k, setK] = useState(1);
  useEffect(() => {
    const on = () => setK(window.innerWidth < 860 ? 0 : 1);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const hasBadge = Boolean(badge);

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className={`bento-grid ${!hasBadge ? "no-badge" : ""}`} ref={grid}>
          <Bento p={p} k={k} from={hasBadge ? { x: 430, y: 150, r: -9, s: 0.55 } : { x: 280, y: 120, r: -7, s: 0.6 }} start={0} className="b-a">
            <div className="b-chips">
              {[f1, f2, f3].map((f) => (
                <span key={f.title}>
                  <Icon name={f.icon} size={18} />
                </span>
              ))}
            </div>
            <div>
              <h4>{f1.title}</h4>
              <p>{f1.text}</p>
            </div>
          </Bento>

          {hasBadge && badge && (
            <Bento p={p} k={k} from={{ x: 430, y: -150, r: 8, s: 0.55 }} start={0.06} className="b-d">
              <strong>{badge.value}</strong>
              <p>{badge.label}</p>
            </Bento>
          )}

          <Bento p={p} k={k} from={{ x: 0, y: 0, r: 0, s: 0.62 }} start={0.02} className="b-img">
            <motion.img src={image} alt={title.replace(/\*/g, "")} loading="lazy" style={{ scale: imgScale, y: imgY }} />
            <span className="b-cap">{title}</span>
          </Bento>

          <Bento p={p} k={k} from={hasBadge ? { x: -330, y: 150, r: 9, s: 0.55 } : { x: 280, y: -120, r: 7, s: 0.6 }} start={0.10} className="b-c">
            <span className="b-ico">
              <Icon name={f2.icon} size={20} />
            </span>
            <div>
              <h4>{f2.title}</h4>
              <p>{f2.text}</p>
            </div>
          </Bento>

          <Bento p={p} k={k} from={hasBadge ? { x: -640, y: 150, r: -8, s: 0.55 } : { x: -280, y: 120, r: -7, s: 0.6 }} start={0.14} className="b-dark">
            <span className="b-ico">
              <Icon name={f3.icon} size={20} />
            </span>
            <div>
              <h4>{f3.title}</h4>
              <p>{f3.text}</p>
            </div>
          </Bento>

          <Bento p={p} k={k} from={hasBadge ? { x: -330, y: -150, r: 7, s: 0.55 } : { x: -280, y: -120, r: 8, s: 0.6 }} start={0.18} className="b-wide">
            {hasBadge ? (
              <>
                <div className="b-wide-content">
                  <h4>{f4.title}</h4>
                  <p>{f4.text}</p>
                </div>
                <div className="b-orbit" aria-hidden>
                  <span className="r1" />
                  <span className="r2" />
                  <span className="core">
                    <Icon name={f4.icon} size={22} />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="b-orbit" aria-hidden>
                  <span className="r1" />
                  <span className="r2" />
                  <span className="core">
                    <Icon name={f4.icon} size={20} />
                  </span>
                </div>
                <div className="b-wide-content">
                  <h4>{f4.title}</h4>
                  <p>{f4.text}</p>
                </div>
              </>
            )}
          </Bento>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Image cards ---------------- */
export function Showcase({
  eyebrow,
  title,
  sub,
  items,
  id,
  tint = false,
  wa,
}: {
  wa?: Wa;
  eyebrow?: string;
  title: string;
  sub?: string;
  items: Card[];
  id?: string;
  tint?: boolean;
}) {
  return (
    <section className={`section ${tint ? "tint" : ""}`} id={id}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Stagger className={`cards ${items.length === 4 ? "four" : ""}`}>
          {items.map((c) => (
            <StaggerItem key={c.title}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }}>
                {/^https?:/.test(c.href ?? "") ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="img-card brand-card" data-brand={c.brand}>

                    <img src={c.image} alt={c.title} loading="lazy" />
                    <span className="go">
                      <Icon name="ArrowUpRight" />
                    </span>
                    <div className="body">
                      {c.tag && <span className="tag">{c.tag}</span>}
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      {c.price && <div className="price">{c.price}</div>}
                    </div>
                  </a>
                ) : (
                  <Link href={c.href ?? "#contact"} className="img-card brand-card" data-brand={c.brand}>

                    <img src={c.image} alt={c.title} loading="lazy" />
                    <span className="go">
                      <Icon name="ArrowUpRight" />
                    </span>
                    <div className="body">
                      {c.tag && <span className="tag">{c.tag}</span>}
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      {c.price && <div className="price">{c.price}</div>}
                    </div>
                  </Link>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <WaRow wa={wa} />
      </div>
    </section>
  );
}

/* ---------------- Restaurant menu grid (curated selection) ---------------- */
export function DishMenu({
  title,
  sub,
  eyebrow,
  items,
  wa,
  cta,
  action,
}: {
  wa?: Wa;
  cta?: { label: string; href: string };
  action?: { label: string; href: string };
  title: string;
  sub?: string;
  eyebrow?: string;
  items: Card[];
}) {
  const buttonAction = cta ?? action;

  return (
    <section className="section tint" id="menu">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Stagger className="dish-grid">
          {items.map((d) => (
            <StaggerItem key={d.title} className="dish">
              <div className="ph">
                <img src={d.image} alt={d.title} loading="lazy" />
              </div>
              <div className="meta">
                <div>
                  <h4>{d.title}</h4>
                  {d.text && <small>{d.text}</small>}
                </div>
                {d.price && <span className="pr">{d.price}</span>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {buttonAction ? (
          <Reveal y={20} className="wa-row">
            <Btn href={buttonAction.href} variant="accent">
              {buttonAction.label}
            </Btn>
          </Reveal>
        ) : (
          <WaRow wa={wa} />
        )}
      </div>
    </section>
  );
}

/* ---------------- Process (cards that open one by one) ---------------- */
export function Process({ eyebrow, title, image, steps }: { eyebrow?: string; title: string; image: string; steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // once visible, open the cards one after another, looping
  useEffect(() => {
    if (!inView || paused) return;
    const t = setInterval(() => setActive((v) => (v + 1) % steps.length), 4200);
    return () => clearInterval(t);
  }, [inView, paused, steps.length]);

  return (
    <section className="section tint">
      <div className="container steps-wrap">
        <div className="steps-head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <SplitText text={title} />
        </div>
        <div className="steps-row" ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {steps.map((st, i) => {
            const on = i === active;
            const pct = steps.length > 1 ? (i / (steps.length - 1)) * 100 : 50;
            return (
              <motion.div
                key={st.title}
                className={`step-card ${on ? "on" : ""}`}
                style={
                  {
                    "--step-pos-x": `${pct}%`,
                    "--step-pos-y": `${pct}%`,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, y: 50, scale: 0.92 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.18, duration: 0.7, ease }}
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                aria-expanded={on}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
              >
                <span className="step-num">{String(i + 1).padStart(2, "0")}.</span>
                <div className="step-img">
                  <img src={image} alt="" loading="lazy" />
                </div>
                <div className="step-body">
                  <h4>{st.title}</h4>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        key="t"
                        initial={{ opacity: 0, y: 14, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.55, ease }}
                      >
                        {st.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {on && !paused && inView && <span className="step-timer" key={`tm${active}`} />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery (mosaic + marquee) ---------------- */
export function Gallery({ eyebrow, title, sub, tiles, marquee }: { eyebrow?: string; title: string; sub?: string; tiles: Tile[]; marquee?: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = tiles.length;
  const step = (d: number) => setOpen((v) => (v === null ? null : (v + d + count) % count));

  // Escape closes, arrow keys move; the page behind is locked while the viewer is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Stagger className="mosaic">
          {tiles.map((t, i) => (
            <StaggerItem key={t.caption} className={`tile ${t.size ?? ""}`}>
              <button type="button" className="tile-btn" onClick={() => setOpen(i)} aria-label={`View ${t.caption} full size`}>
                <img src={t.src} alt={t.caption} loading="lazy" />
                <div className="tile-caption">
                  {t.caption}
                  <Icon name="Maximize" size={17} />
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      {marquee && (
        <div style={{ marginTop: 60 }}>
          <Marquee images={marquee.map((m) => ({ src: m, alt: "Trattorias Varkala" }))} />
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={tiles[open].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={open}
              src={tiles[open].src}
              alt={tiles[open].caption}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lb-caption">{tiles[open].caption}</div>
            <button
              type="button"
              className="lb-close"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
              }}
            >
              <Icon name="X" size={20} />
            </button>
            <button
              type="button"
              className="lb-nav prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            <button
              type="button"
              className="lb-nav next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <Icon name="ArrowRight" size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Auto-scrolling photo strip (its own band, below the number cards) ---------------- */
export function MarqueeBand({ images }: { images: string[] }) {
  return (
    <section className="section" style={{ paddingTop: 70, paddingBottom: 40 }}>
      <Marquee images={images.map((m) => ({ src: m, alt: "Trattorias Varkala" }))} />
    </section>
  );
}

/* ---------------- Join (list cards + image) ---------------- */
export function Join({ title, sub, items, image, text }: { title: string; sub: string; items: Feature[]; image: string; text: string }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHead title={title} sub={sub} />
        <div className="join">
          <Stagger className="list-cards">
            {items.map((f) => (
              <StaggerItem key={f.title} className="list-card">
                <span className="ico">
                  <Icon name={f.icon} />
                </span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal x={50} y={0}>
            <div className="join-media">
              <img src={image} alt={title.replace(/\*/g, "")} loading="lazy" />
            </div>
            <p className="join-text">{text}</p>
            <a href="#contact" className="link-arrow">
              Learn More
              <span>
                <Icon name="ArrowRight" size={12} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function Stats({ items }: { items: { to: number; suffix?: string; decimals?: number; label: string }[] }) {
  return (
    <div className="container">
      <Stagger className="stats">
        {items.map((s) => (
          <StaggerItem key={s.label} className="stat">
            <strong>
              <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
            </strong>
            <small>{s.label}</small>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ---------------- Amenities (grouped checklists) ---------------- */
export function Amenities({ eyebrow, title, sub, groups, wa }: { wa?: Wa; eyebrow?: string; title: string; sub?: string; groups: AmenityGroup[] }) {
  return (
    <section className="section" id="amenities">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <div className="amen-marquee">
          <div className="amen-track">
            {/* three copies so the loop is seamless and never shows a gap */}
            {[0, 1, 2].flatMap((copy) =>
              groups.map((g, i) => (
                <div key={`${copy}-${g.title}`} className="amen-card" aria-hidden={copy > 0}>
                  <div className="amen-top">
                    <span className="ico">
                      <Icon name={g.icon} size={22} />
                    </span>
                    <span className="amen-idx">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4>{g.title}</h4>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>
                        <Icon name="Check" size={14} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
        <WaRow wa={wa} />
      </div>
    </section>
  );
}

/* ---------------- Nearby places with distances ---------------- */
export function Nearby({ eyebrow, title, sub, places, wa }: { wa?: Wa; eyebrow?: string; title: string; sub: string; image?: string; places: { name: string; distance: string }[] }) {
  // three rows, filled in turn; rows 1 and 3 drift left-then-right, row 2 drifts right-then-left
  // each row is cycled up to at least 10 pills so one copy always covers the full width (no gap at the edges)
  const rows = [0, 1, 2].map((r) => {
    const base = places.filter((_, i) => i % 3 === r);
    return Array.from({ length: Math.max(10, base.length) }, (_, i) => base[i % base.length]);
  });
  return (
    <section className="section tint" id="nearby">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <div className="near-marquee">
          {rows.map((row, ri) => (
            <div key={ri} className={`near-track ${ri === 1 ? "dir-b" : "dir-a"} r${ri}`}>
              {/* repeated three times so a row is always full, never showing an empty gap */}
              {[0, 1, 2].flatMap((copy) =>
                row.map((p, i) => (
                  <div key={`${copy}-${i}`} className="near-row" aria-hidden={copy > 0}>
                    <span className="ico">
                      <Icon name="MapPin" size={16} />
                    </span>
                    <strong>{p.name}</strong>
                    <em>{p.distance}</em>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
        <WaRow wa={wa} />
      </div>
    </section>
  );
}

/* ---------------- Ratings: text + points + big numbers on the left, staggered cards on the right ---------------- */
const isRating = (v: string) => /^[0-5](\.\d)?$/.test(v);

function MobileRatingsSlider({ scores }: { scores: Score[] }) {
  const total = scores.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "50px" });
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (total <= 1 || paused || !inView) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((v) => (v + 1) % total);
    }, 3500);
    return () => clearInterval(t);
  }, [total, paused, inView]);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 40) {
        setDirection(1);
        setIndex((v) => (v + 1) % total);
      } else if (diff < -40) {
        setDirection(-1);
        setIndex((v) => (v - 1 + total) % total);
      }
      touchStartX.current = null;
    }
    setTimeout(() => setPaused(false), 2500);
  };

  const current = scores[index] ?? scores[0];

  return (
    <div
      ref={ref}
      className="rev-mobile"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Guest Ratings"
    >
      <div className="rev-mobile-slider">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? "100%" : "-100%",
                opacity: 0,
              }),
              center: {
                x: "0%",
                opacity: 1,
              },
              exit: (dir: number) => ({
                x: dir > 0 ? "-100%" : "100%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="rev-mobile-card-wrap"
          >
            <div className="rev-card">
              <div className="rev-head">
                <strong>{current.label}</strong>
                <small>{current.note}</small>
              </div>
              <div className="rev-score">
                <b>{current.value}</b>
                {isRating(current.value) && (
                  <span className="rev-stars">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Icon key={k} name="Star" size={14} fill="currentColor" />
                    ))}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="rev-mobile-dots" aria-label="Review slide navigation">
          {scores.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`rev-mobile-dot ${i === index ? "on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1} of ${total}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Ratings({ eyebrow, title, sub, scores, chipsTitle, chips }: { eyebrow?: string; title: string; sub?: string; scores: Score[]; chipsTitle: string; chips: string[] }) {
  // two auto-moving columns: up, down. Each column starts at a different card; the set is repeated so it can loop.
  const dirs = ["up", "down"] as const;
  const cols = [0, 1].map((ci) => {
    const base = scores.map((_, j) => scores[(j + ci) % scores.length]);
    const set: Score[] = [];
    while (set.length < 4) set.push(...base);
    return set;
  });

  return (
    <section className="section tint">
      <div className="container rev-wrap">
        <div className="rev-left">
          <div>
            {eyebrow && (
              <Reveal y={16}>
                <span className="eyebrow">{eyebrow}</span>
              </Reveal>
            )}
            <SplitText text={title} />
            {sub && (
              <Reveal delay={0.2} y={20}>
                <p className="rev-sub">{sub}</p>
              </Reveal>
            )}
            <Reveal delay={0.3} y={20}>
              <h4 className="rev-points-title">{chipsTitle}</h4>
              <ul className="rev-points">
                {chips.map((t) => (
                  <li key={t}>
                    <Icon name="Check" size={15} />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="rev-right rev-desktop">
          {cols.map((set, ci) => (
            <div key={ci} className="rev-col">
              <div className={`rev-track ${dirs[ci]} d${ci}`}>
                {[...set, ...set].map((c, i) => (
                  <div key={i} className="rev-card" aria-hidden={i >= set.length}>
                    <div className="rev-head">
                      <strong>{c.label}</strong>
                      <small>{c.note}</small>
                    </div>
                    <div className="rev-score">
                      <b>{c.value}</b>
                      {isRating(c.value) && (
                        <span className="rev-stars">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Icon key={k} name="Star" size={14} fill="currentColor" />
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <MobileRatingsSlider scores={scores} />
      </div>
    </section>
  );
}

/* ---------------- Booking channels ---------------- */
export function Book({ eyebrow, title, sub, platforms, phone, whatsapp: wa, platformLinks }: { eyebrow?: string; title: string; sub: string; platforms: string[]; phone?: string; whatsapp?: string; platformLinks?: Record<string, string> }) {
  return (
    <section className="section" id="book">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Reveal y={24}>
          <div className="book-box">
            {phone && (
              <div className="book-direct">
                <small>Direct booking</small>
                <strong>{phone}</strong>
                <div className="book-btns">
                  <Btn href={tel(phone)} variant="accent">
                    Call Now
                  </Btn>
                  {wa && (
                    <a href={whatsapp(wa)} className="btn btn-light" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                      <span className="btn-dot">
                        <WhatsAppLogo size={17} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
            <div className="book-platforms">
              <small>Also listed on</small>
              <div className="chips">
                {platforms.map((p) => {
                  const href = platformLinks?.[p];
                  return href ? (
                    <a key={p} href={href} target="_blank" rel="noopener noreferrer" className="chip big chip-link">
                      {p}
                    </a>
                  ) : (
                    <span key={p} className="chip big">
                      {p}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Info strip ---------------- */
export function InfoStrip({ items }: { items: { icon: IconName; label: string; value: string; href?: string }[] }) {
  return (
    <Stagger className="info-strip">
      {items.map((it) => {
        const inner = (
          <>
            <span className="ico">
              <Icon name={it.icon} />
            </span>
            <div>
              <small>{it.label}</small>
              <span>{it.value}</span>
            </div>
          </>
        );
        return (
          <StaggerItem key={it.label} className={`info${it.href ? " info-link" : ""}`}>
            {it.href ? (
              <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={`${it.label}: ${it.value}`}>
                {inner}
              </a>
            ) : (
              inner
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ---------------- CTA ---------------- */
export function Cta({
  eyebrow,
  title,
  sub,
  button,
  href = "#contact",
  image,
  info,
}: {
  eyebrow?: string;
  title: string;
  sub: string;
  button: string;
  href?: string;
  image: string;
  info?: { icon: IconName; label: string; value: string }[];
}) {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <Reveal scale={0.95} y={30}>
          <div className="cta">
            <div className="cta-bg">
              <img src={image} alt="" loading="lazy" />
            </div>
            <motion.span
              className="blob"
              style={{ top: -160, left: -120 }}
              animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="blob"
              style={{ bottom: -200, right: -100 }}
              animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <SplitText text={title} />
            <p>{sub}</p>
            <Btn href={href}>{button}</Btn>
          </div>
        </Reveal>
        {info && <InfoStrip items={info} />}
      </div>
    </section>
  );
}

/* ---------------- Sticky WhatsApp icon (bottom right) — hidden while the hero is on screen ---------------- */
export function WhatsAppFab({ href }: { href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".home-hero, .hero-wrap");
    if (!hero) {
      setShow(true);
      return;
    }
    // the bottom 100px of the viewport is ignored, so the icon appears as soon as the hero's edge leaves the screen
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: "0px 0px -100px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <motion.a
      href={href}
      className="wa-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      <WhatsAppLogo size={32} />
      <span className="wa-tip">Enquire on WhatsApp</span>
    </motion.a>
  );
}
