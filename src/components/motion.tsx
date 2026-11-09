"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode, type ElementType } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view (transition animation). */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  className,
  scale = 1,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Container that staggers its <StaggerItem> children. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={groupV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemV}>
      {children}
    </motion.div>
  );
}

/** Word-by-word text loading animation. Text stays in the HTML for SEO. */
export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const Tag = as;
  const lines = text.split("\n");
  let i = 0;
  return (
    <Tag className={className} aria-label={text.replace(/\n/g, " ").replace(/\*/g, "")}>
      {lines.map((line, li) => {
        // Parse words, identifying which words are inside *accent* or **bold** markers (including multi-word phrases)
        const tokens: { word: string; isAccent: boolean }[] = [];
        const pattern = /(\*{1,2}[^*]+?\*{1,2})([^\s*]*)|\S+/g;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(line)) !== null) {
          const starred = match[1];
          const punct = match[2] ?? "";
          if (starred) {
            const inner = starred.replace(/^\*+|\*+$/g, "");
            const words = inner.split(/\s+/).filter(Boolean);
            words.forEach((w, wi) => {
              const p = wi === words.length - 1 ? punct : "";
              tokens.push({ word: w + p, isAccent: true });
            });
          } else {
            tokens.push({ word: match[0], isAccent: false });
          }
        }

        return (
          <span key={li} style={{ display: "block" }} aria-hidden>
            {tokens.map(({ word, isAccent }, wi) => {
              const idx = i++;
              return (
                // The trigger sits on the (untranslated) clip box, so even one-letter words like "a" are detected in view.
                <motion.span
                  key={wi}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em" }}
                  initial="hidden"
                  {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true } })}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { y: "110%", opacity: 0, rotate: 4 },
                      show: { y: "0%", opacity: 1, rotate: 0 },
                    }}
                    transition={{ duration: 0.8, ease, delay: delay + idx * 0.06 }}
                  >
                    {isAccent ? (
                      <span className="accent-word" style={{ color: "var(--accent)", fontWeight: 700 }}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    &nbsp;
                  </motion.span>
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

/** Image that drifts while scrolling (movement animation). */
export function Parallax({
  src,
  alt,
  className,
  strength = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.18, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

/** Number that counts up when visible. */
export function Counter({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, {
      duration: 2,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, mv, prefix, suffix, decimals]);
  return (
    <span ref={ref}>
      {prefix}
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Infinite horizontal image strip. */
export function Marquee({ images, reverse = false }: { images: { src: string; alt: string }[]; reverse?: boolean }) {
  const doubled = [...images, ...images];
  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: images.length * 6, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((im, i) => (
          <div className="marquee-item" key={i}>
            <img src={im.src} alt={im.alt} loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export { motion };
