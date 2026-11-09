"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/Icon";
import { Reveal, SplitText } from "@/components/motion";
import { WhatsAppLogo } from "@/components/Sections";
import { site, tel, whatsapp, waLink } from "@/data/content";

type PropertyKey = "tranquil" | "restaurant" | "holiday" | "general";

interface PropertyOption {
  key: PropertyKey;
  label: string;
  badge: string;
}

const propertyOptions: PropertyOption[] = [
  {
    key: "tranquil",
    label: "Trattorias Tranquil",
    badge: "Bed & Breakfast",
  },
  {
    key: "restaurant",
    label: "Trattorias Restaurant",
    badge: "Cliff-Top Dining",
  },
  {
    key: "holiday",
    label: "Trattorias Holiday Homes",
    badge: "Homestay",
  },
  {
    key: "general",
    label: "General Enquiry",
    badge: "All Trattorias Places",
  },
];

export function ContactView() {
  const [property, setProperty] = useState<PropertyKey>("tranquil");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedOption = propertyOptions.find((p) => p.key === property) || propertyOptions[0];

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setError("");

    const lines: string[] = ["Hello Trattorias! 👋", ""];
    lines.push(`*Name:* ${name.trim()}`);
    if (phone.trim()) {
      lines.push(`*Phone:* ${phone.trim()}`);
    }
    lines.push(`*Property:* ${selectedOption.label} (${selectedOption.badge})`);

    if (message.trim()) {
      lines.push("");
      lines.push("*Message:*");
      lines.push(message.trim());
    } else {
      lines.push("");
      lines.push("I would like to inquire about availability and details.");
    }

    const targetUrl = waLink(site.phone, lines.join("\n"));
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-page-content">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-inner">
            <Reveal y={16}>
              <span className="eyebrow">Contact Trattorias</span>
            </Reveal>

            <SplitText text="Get in *Touch* with Us" as="h1" immediate />

            <Reveal delay={0.15} y={18}>
              <p>
                Have a question or looking to plan your stay or dining in Varkala? Fill out the simple details below and send us an instant WhatsApp message.
              </p>
            </Reveal>

            {/* Quick Contact Bar */}
            <Reveal delay={0.25} y={20}>
              <div className="quick-cards-grid">
                <a href={tel(site.phone)} className="quick-card">
                  <div className="quick-card-icon">
                    <Icon name="Phone" size={20} />
                  </div>
                  <div className="quick-card-text">
                    <small>Call Direct</small>
                    <strong>{site.phone}</strong>
                  </div>
                </a>

                <a
                  href={whatsapp(site.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-card"
                >
                  <div className="quick-card-icon" style={{ color: "#25d366" }}>
                    <WhatsAppLogo size={20} />
                  </div>
                  <div className="quick-card-text">
                    <small>Instant WhatsApp</small>
                    <strong>+91 97469 68992</strong>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Trattorias+Varkala+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-card"
                >
                  <div className="quick-card-icon">
                    <Icon name="MapPin" size={20} />
                  </div>
                  <div className="quick-card-text">
                    <small>Location</small>
                    <strong>Varkala, Kerala, India</strong>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Simple Contact Form Card */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-simple-container">
            <motion.div
              className="contact-form-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span className="form-header-badge">Direct Inquiry</span>
                <h2>Send Us a Message</h2>
                <p className="form-intro" style={{ marginBottom: 0 }}>
                  Enter your details below and click the button to start a WhatsApp chat with our team.
                </p>
              </div>

              <form onSubmit={handleOpenWhatsApp} noValidate>
                {/* 1. Custom Property Type Dropdown */}
                <div className="form-group" style={{ position: "relative", zIndex: 30 }}>
                  <label className="form-label">
                    <span>Type of Property</span>
                  </label>

                  <div className="dropdown-wrap" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`dropdown-trigger ${dropdownOpen ? "open" : ""}`}
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      <div className="dropdown-trigger-content">
                        <span className="dropdown-trigger-text">
                          {selectedOption.label} <small style={{ color: "var(--muted)" }}>({selectedOption.badge})</small>
                        </span>
                      </div>
                      <span className="dropdown-chevron">
                        <Icon name="ChevronDown" size={18} />
                      </span>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.ul
                          className="dropdown-menu"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          role="listbox"
                        >
                          {propertyOptions.map((opt) => {
                            const isSelected = property === opt.key;
                            return (
                              <li
                                key={opt.key}
                                className={`dropdown-item ${isSelected ? "selected" : ""}`}
                                onClick={() => {
                                  setProperty(opt.key);
                                  setDropdownOpen(false);
                                }}
                                role="option"
                                aria-selected={isSelected}
                              >
                                <div className="dropdown-item-left">
                                  <div className="dropdown-item-info">
                                    <span className="dropdown-item-title">{opt.label}</span>
                                    <span className="dropdown-item-badge">{opt.badge}</span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <div className="dropdown-item-check">
                                    <Icon name="Check" size={16} />
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 2. Contact Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">
                    <span>Contact Name *</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Maya Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError("");
                    }}
                    required
                  />
                  {error && (
                    <span style={{ color: "#d1603d", fontSize: "12px", marginTop: "4px" }}>
                      {error}
                    </span>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phoneNumber">
                    <span>Phone Number</span>
                    <small>Optional</small>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* 4. Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">
                    <span>Message</span>
                    <small>Optional</small>
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    className="form-textarea"
                    placeholder="How can we help you? (e.g. room availability, dates, booking a table...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* WhatsApp Action Button */}
                <div className="form-submit-row" style={{ marginTop: 24 }}>
                  <button type="submit" className="btn-whatsapp-action">
                    <span className="wa-icon-box">
                      <WhatsAppLogo size={20} />
                    </span>
                    <span>Chat on WhatsApp</span>
                    <Icon name="ArrowUpRight" size={18} />
                  </button>

                  <div className="submit-note">
                    <Icon name="ShieldCheck" size={14} color="#3fa34d" />
                    <span>
                      Opens WhatsApp with your pre-filled details to <strong>{site.phone}</strong>.
                    </span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
