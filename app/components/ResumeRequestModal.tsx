"use client";
import React, { useState, useEffect } from "react";
import { X, Download, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
}

export default function ResumeRequestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    profile: "",
    purpose: "Hiring / Recruitment",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setError(null);
      setDownloadUrl(null);
    };

    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/resume-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setDownloadUrl(data.downloadUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="modal-content resume-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="resume-modal-header">
          <div className="resume-badge">
            <Lock size={13} />
            <span>Gated Document Access</span>
          </div>
          <h2 id="resume-modal-title" style={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}>
            Request Resume / CV
          </h2>
          <p className="resume-modal-subtitle">
            Personal contact details and resume are shared only after a brief introduction request.
          </p>
        </div>

        {downloadUrl ? (
          <div className="resume-success-pane">
            <div className="success-icon-wrap">
              <CheckCircle2 size={32} className="success-icon" />
            </div>
            <h3>Request Approved</h3>
            <p className="success-instruction">
              Your one-time secure download link is ready. The public version of the CV contains complete career history, technical stacks, and verified deliverables without personal contact numbers.
            </p>
            <div className="success-action-row">
              <a
                href={downloadUrl}
                download="Tejas_Phutane_Resume.pdf"
                className="btn btn-primary"
                onClick={() => {
                  setTimeout(() => setIsOpen(false), 2000);
                }}
              >
                <Download size={16} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
            <span className="token-expiry-note">
              Link is signed with an HMAC token and remains valid for 15 minutes.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="resume-request-form">
            {/* Honeypot field (hidden from real users) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="resume-website">Website</label>
              <input
                id="resume-website"
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="form-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="req-name">Full Name *</label>
              <input
                id="req-name"
                type="text"
                required
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="req-email">Professional Email *</label>
              <input
                id="req-email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row-grid">
              <div className="form-group">
                <label htmlFor="req-company">Company / Organization *</label>
                <input
                  id="req-company"
                  type="text"
                  required
                  placeholder="e.g. Robotics Lab / OEM"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="req-purpose">Intended Purpose *</label>
                <select
                  id="req-purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="form-select"
                >
                  <option value="Hiring / Recruitment">Hiring / Recruitment</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Consulting / Advisory">Consulting / Advisory</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="req-profile">LinkedIn or GitHub Profile *</label>
              <input
                id="req-profile"
                type="text"
                required
                placeholder="https://linkedin.com/in/... or github.com/..."
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="resume-form-footer">
              <p className="privacy-guarantee">
                <ShieldCheck size={14} />
                <span>Your information is sent directly to Tejas and never shared.</span>
              </p>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%" }}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request &amp; Access Resume</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}