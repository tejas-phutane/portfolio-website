"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Mail, Phone, MapPin } from "lucide-react";

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitStatus("success");
      setSubmitMessage(result.message || "Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      setSubmitStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Failed to send message.";
      setSubmitMessage(errorMessage + " Please try again or contact me directly.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s <span className="gradient-text">Connect</span></h2>
        </ScrollReveal>

        <div className="contact-wrapper">
          <ScrollReveal>
            <p className="contact-intro">
              I&apos;m always excited to connect with fellow engineers, researchers, and innovators. Whether you have
              questions about robotics, want to discuss potential collaborations, or just want to say hello —
              I&apos;d love to hear from you!
            </p>
          </ScrollReveal>

          <div className="contact-cards">
            <ScrollReveal delay={1}>
              <div className="contact-card">
                <div className="contact-card-icon"><Mail size={20} /></div>
                <h3>Email</h3>
                <a href="mailto:tejasphutane.work@gmail.com">tejasphutane.work@gmail.com</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="contact-card">
                <div className="contact-card-icon"><Phone size={20} /></div>
                <h3>Phone</h3>
                <a href="tel:+918484016205">+91-8484016205</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <div className="contact-card">
                <div className="contact-card-icon"><LinkedinIcon size={20} /></div>
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/tejas-phutane" target="_blank" rel="noopener noreferrer">linkedin.com/in/tejas-phutane</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="contact-card">
                <div className="contact-card-icon"><GithubIcon size={20} /></div>
                <h3>GitHub</h3>
                <a href="https://github.com/tejas-phutane" target="_blank" rel="noopener noreferrer">github.com/tejas-phutane</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="contact-card">
                <div className="contact-card-icon"><MapPin size={20} /></div>
                <h3>Location</h3>
                <span>Mumbai, India</span>
                <span className="contact-note">Open to global opportunities</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="contact-form-container">
              <h3>Send a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitStatus === "sending"}>
                  {submitStatus === "sending" ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="form-message success">{submitMessage}</div>
                )}
                {submitStatus === "error" && (
                  <div className="form-message error">{submitMessage}</div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
