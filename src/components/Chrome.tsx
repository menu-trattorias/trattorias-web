"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { site, tel, whatsapp } from "@/data/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/tranquil/", label: "Tranquil" },
  { href: "/restaurant/", label: "Restaurant" },
  { href: "/holiday-home/", label: "Holiday Home" },
  { href: "/contact/", label: "Contact" },
];

export function Logo({ sub }: { sub?: string }) {
  return (
    <Link href="/" className="logo" aria-label="Trattorias home">
      <motion.span className="logo-mark" whileHover={{ rotate: -12, scale: 1.08 }}>
        T
      </motion.span>
      <span>
        Trattorias
        {sub && <small>{sub}</small>}
      </span>
    </Link>
  );
}

export function Navbar({ sub }: { sub?: string }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => (href === "/" ? path === "/" : path?.startsWith(href.slice(0, -1)));

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container nav-inner">
          <Logo sub={sub} />
          <nav aria-label="Main">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href} style={{ position: "relative", zIndex: 0 }}>
                  <Link href={l.href} className={isActive(l.href) ? "active" : ""}>
                    {isActive(l.href) && <motion.span layoutId="nav-pill" className="nav-pill" />}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/contact/" className="btn btn-accent">
            Contact Us
            <span className="btn-dot">
              <Icon name="ArrowUpRight" size={16} />
            </span>
          </Link>
          <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="Menu" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icon name="X" color="#000" />
            </button>
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>
              Eat, stay and unwind in Varkala. A cliff-top restaurant and two stays near the beaches of Varkala, Kerala.
            </p>
          </div>
          <div>
            <h5>Our Places</h5>
            <ul>
              <li><Link href="/tranquil/">Trattorias Tranquil</Link></li>
              <li><Link href="/restaurant/">Trattorias Restaurant</Link></li>
              <li><Link href="/holiday-home/">Trattorias Holiday Home</Link></li>
            </ul>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              <li><Link href="/restaurant/#menu">Menu</Link></li>
              <li><Link href="/holiday-home/#rooms">Rooms</Link></li>
              <li><Link href="/tranquil/#rooms">Tranquil Rooms</Link></li>
              <li><Link href="/#gallery">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><Link href="/contact/">Contact Us</Link></li>
              <li><a href={tel(site.phone)}>{site.phone}</a></li>
              <li><a href={whatsapp(site.phone)} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
              <li><Link href="/contact/#map">{site.address}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Trattorias Varkala. All rights reserved.</span>
          <div>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
