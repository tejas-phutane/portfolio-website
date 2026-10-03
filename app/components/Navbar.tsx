"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SECTIONS = ["about", "skills", "experience", "projects", "services", "blogs", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // If on blog route, keep Articles highlighted
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/blog")) {
      setActiveSection("blogs");
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Clear active section if at top of page (Hero)
      if (window.scrollY < 180) {
        setActiveSection("");
        return;
      }

      // Viewport-relative section tracking
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top is near upper viewport and bottom has not left
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    } else {
      // If navigating from another page (like /blog or /blog/[slug])
      window.location.href = `/#${id}`;
    }
  };

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
          Tejas Phutane<span className="brand-dot">.</span>
        </a>

        <nav>
          <ul className="navbar-links">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a
                  href={`/#${s}`}
                  className={activeSection === s ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(s); }}
                >
                  {s === "blogs" ? "Articles" : s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <a className="navbar-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar-socials">
          <a href="https://github.com/tejas-phutane" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/tejas-phutane" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {SECTIONS.map((s) => (
          <a
            key={s}
            href={`/#${s}`}
            className={activeSection === s ? "active" : ""}
            onClick={(e) => { e.preventDefault(); scrollTo(s); }}
          >
            {s === "blogs" ? "Articles" : s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume ↓
        </a>
      </div>
    </header>
  );
}
