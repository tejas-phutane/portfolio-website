"use client";
import { Download, ArrowRight, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-layout">
          {/* Left Column: Authoritative Editorial Presentation */}
          <div className="hero-editorial">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" />
              <span>Current Role: Senior Engineer L1 @ FEV India</span>
            </div>

            <h1 className="hero-headline">
              Tejas Phutane
            </h1>

            <p className="hero-subheading">
              Senior Robotics &amp; Computer Vision Engineer specialized in end-to-end autonomous systems, real-time edge perception, and industrial digital twins.
            </p>

            <p className="hero-bio">
              Over 4+ years architecting and shipping production-grade robotics — from deploying real-time vision pipelines processing 10,000+ items daily on factory floors to commissioning 7+ robotic platforms at India&apos;s First Robotics Gallery and engineering aerospace computer vision systems with DRDO/ADA. Focused on low-latency C++ optimization, sensor fusion, and sim-to-real transfer.
            </p>

            {/* Executive Proof Points Strip (Replaces fake terminal) */}
            <div className="hero-metrics-strip">
              <div className="metric-box">
                <span className="metric-number">4+</span>
                <span className="metric-label">Years Production Robotics</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">7+</span>
                <span className="metric-label">Robotic Platforms Deployed</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">80%</span>
                <span className="metric-label">Compute Overhead Reduced</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">10K+</span>
                <span className="metric-label">Daily Objects Handled</span>
              </div>
            </div>

            {/* Actions & Verified Links */}
            <div className="hero-actions-row">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>View Engineering Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="/resume.pdf"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
                <span>Resume / CV</span>
              </a>

              <div className="hero-social-links">
                <a
                  href="https://github.com/tejas-phutane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/tejas-phutane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Precision Architectural Portrait Frame */}
          <div className="hero-portrait-wrapper">
            <div className="architectural-frame">
              {/* Technical corner brackets */}
              <div className="frame-corner corner-tl" />
              <div className="frame-corner corner-tr" />
              <div className="frame-corner corner-bl" />
              <div className="frame-corner corner-br" />

              <div className="frame-header-bar">
                <span className="frame-index">SYS_ID // TP-ROB-01</span>
                <span className="frame-tag">AUTONOMY &amp; SIM</span>
              </div>

              <div className="frame-image-container">
                <img
                  src="/images/profile.png"
                  alt="Tejas Phutane — Senior Robotics & Computer Vision Engineer"
                  className="frame-image"
                />
                <div className="frame-image-overlay" />
              </div>

              <div className="frame-footer-card">
                <div className="footer-status">
                  <span className="status-pulse-live" />
                  <span className="footer-status-text">Available for Senior &amp; Staff Roles</span>
                </div>
                <span className="footer-spec">FEV India · Vadodara · Pune</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
