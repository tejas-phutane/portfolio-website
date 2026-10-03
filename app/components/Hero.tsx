"use client";
import React, { useState } from "react";
import { Download, ArrowRight, Mail, MapPin, Copy, Check, Terminal, Cpu } from "lucide-react";

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

const XTwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("tejasphutane.work@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-layout">
          {/* Left Column: Authoritative Editorial Presentation */}
          <div className="hero-editorial">
            <div className="hero-meta-badges">
              <div className="hero-status-pill">
                <span className="status-indicator-dot" />
                <span>Senior Engineer L1 @ FEV India (Humanoids &amp; Sim-to-Real)</span>
              </div>
              <div className="hero-location-pill">
                <MapPin size={13} className="pill-icon" />
                <span>Pune / Mumbai, India</span>
              </div>
            </div>

            <h1 className="hero-headline">
              Tejas Phutane
            </h1>

            <p className="hero-subheading">
              Senior Robotics &amp; Computer Vision Engineer specialized in humanoid platforms, sim-to-real locomotion policies, and real-time edge perception.
            </p>

            <p className="hero-bio">
              Over 4+ years architecting and shipping production-grade robotics — currently developing bipedal locomotion policies, safety layers, and sim-to-real transfer for the Unitree G1 humanoid at FEV India. Proven track record deploying sub-50ms TensorRT perception pipelines on factory floors, commissioning 7+ robotic platforms at Gujarat Science City, and engineering aerospace vision systems with DRDO/ADA.
            </p>

            {/* Executive Proof Points Strip */}
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
                <span className="metric-number">Sub-50ms</span>
                <span className="metric-label">Edge Perception Latency</span>
              </div>
            </div>

            {/* Actions & Verified Direct Contact Channels */}
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

              {/* Direct Email Pill with One-Click Copy */}
              <button
                type="button"
                className="hero-email-pill"
                onClick={handleCopyEmail}
                title="Click to copy email address"
                aria-label="Copy email address"
              >
                <Mail size={15} />
                <span className="email-text">tejasphutane.work@gmail.com</span>
                {copiedEmail ? (
                  <span className="copy-state copied">
                    <Check size={13} />
                    <span>Copied</span>
                  </span>
                ) : (
                  <span className="copy-state">
                    <Copy size={13} />
                  </span>
                )}
              </button>

              <div className="hero-social-links">
                <a
                  href="https://github.com/tejas-phutane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/tejas-phutane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href="https://x.com/tejas_phutane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="X / Twitter Profile"
                  title="X (Twitter)"
                >
                  <XTwitterIcon size={17} />
                </a>
                <a
                  href="mailto:tejasphutane.work@gmail.com"
                  className="social-btn"
                  aria-label="Send direct email"
                  title="Direct Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Architectural Tech Stack Strip */}
            <div className="hero-stack-strip">
              <span className="stack-strip-label">
                <Cpu size={13} />
                <span>CORE HARDWARE &amp; COMPUTE STACK:</span>
              </span>
              <div className="stack-strip-pills">
                <span className="stack-pill">ROS 2</span>
                <span className="stack-pill">C++20</span>
                <span className="stack-pill">Unitree G1</span>
                <span className="stack-pill">NVIDIA Isaac Sim</span>
                <span className="stack-pill">DeepStream</span>
                <span className="stack-pill">TensorRT</span>
                <span className="stack-pill">Jetson AGX</span>
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
                <span className="frame-tag">G1 HUMANOID // SIM-TO-REAL</span>
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
                <span className="footer-spec">FEV India · Unitree G1 &amp; Inspire Hand · Pune</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
