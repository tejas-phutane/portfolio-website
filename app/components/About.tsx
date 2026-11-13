"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Eye, Brain, Layers, Zap, ShieldCheck, Activity, Target, ArrowRight } from "lucide-react";
import { getAboutData, AboutData } from "../lib/content";

const ABOUT_ICON_MAP: Record<string, React.ReactNode> = {
  Zap: <Zap size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Activity: <Activity size={20} />,
  Target: <Target size={20} />,
  Cpu: <Cpu size={22} />,
  Eye: <Eye size={22} />,
  Brain: <Brain size={22} />,
  Layers: <Layers size={22} />,
};

function parseMetric(item: string) {
  const match = item.match(/^(Up to \d+%|\d+×|\d+(\.\d+)?%|\d+\+?)\s+(.*)$/i);
  if (match) {
    const val = match[1];
    const rest = match[3];
    const paren = rest.match(/^(.*?)\s*\((.*?)\)(.*)$/);
    if (paren) {
      return {
        val,
        heading: paren[1].trim(),
        sub: paren[2].trim() + (paren[3] ? " " + paren[3].trim() : ""),
      };
    }
    return {
      val,
      heading: rest,
      sub: "",
    };
  }
  return {
    val: "",
    heading: item,
    sub: "",
  };
}

export default function About() {
  const about: AboutData = getAboutData();
  const currentlyItem = about.highlights.find((h) => h.title.toLowerCase().includes("current"));
  const educationItem = about.highlights.find((h) => h.title.toLowerCase().includes("education"));
  const achievementsItem = about.highlights.find((h) => h.title.toLowerCase().includes("achievement"));

  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Background &amp; Journey</p>
          <h2>{about.heading.split("Production")[0]}<span className="gradient-text">Production Floors</span></h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="about-grid">
            <div className="about-body">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Highlights (Option 1): Left Stacked Context vs Right Metric Grid */}
        <div className="about-bento-grid">
          {/* Left Column: Stacked Context (Currently + Education) */}
          <div className="bento-context-column">
            {currentlyItem && (
              <ScrollReveal delay={1}>
                <div className="bento-card bento-card-focus">
                  <div className="bento-card-header">
                    <div className="bento-header-badge">
                      <span className="status-indicator-dot" />
                      <span>Active Engagement</span>
                    </div>
                    <span className="bento-category-tag">FEV India · Pune</span>
                  </div>
                  <h3 className="bento-card-title">{currentlyItem.lines?.[0] || "Senior Engineer L1"}</h3>
                  <p className="bento-card-lead">{currentlyItem.lines?.[1] || "Unitree G1 Humanoid & Inspire Hand"}</p>
                  <p className="bento-card-desc">
                    {currentlyItem.lines?.[2] || "Developing ROS 2 HAL, Isaac Sim digital twins, and staged Sim-to-Real policy validation."}
                  </p>
                  <div className="bento-tags-row">
                    <span className="bento-tag">Unitree G1</span>
                    <span className="bento-tag">ROS 2 C++</span>
                    <span className="bento-tag">Isaac Sim</span>
                    <span className="bento-tag">Safety Wrappers</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {educationItem && (
              <ScrollReveal delay={2}>
                <div className="bento-card bento-card-edu">
                  <div className="bento-card-header">
                    <span className="bento-category-tag">Academic Foundations</span>
                    <span className="bento-category-tag">Mumbai University</span>
                  </div>
                  <h3 className="bento-card-title">{educationItem.lines?.[0] || "B.E. Electronics & Telecommunication"}</h3>
                  <p className="bento-card-lead">{educationItem.lines?.[1] || "RGIT Mumbai (2017-2021) · CGPA: 7.04"}</p>
                  <p className="bento-card-desc">
                    {educationItem.lines?.[2] || "Simulation Head at RGIT Robotics Club (mentored 50+ students in ROS, Gazebo & kinematics)."}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Column: Key Achievements 2x2 Grid */}
          {achievementsItem && achievementsItem.items && (
            <ScrollReveal delay={3}>
              <div className="bento-card bento-card-achievements">
                <div className="bento-card-header">
                  <div>
                    <span className="bento-category-tag">Quantified Track Record</span>
                    <h3 className="bento-card-title" style={{ marginTop: "4px" }}>Key Production Achievements</h3>
                  </div>
                  <span className="bento-proof-badge">Field Verified</span>
                </div>
                <p className="bento-card-desc" style={{ marginBottom: "var(--space-4)" }}>
                  Empirically profiled and verified across industrial automation facilities and edge compute deployments.
                </p>

                <div className="bento-metrics-grid">
                  {achievementsItem.items.map((item, idx) => {
                    const parsed = parseMetric(item);
                    return (
                      <div className="bento-metric-tile" key={idx}>
                        <span className="bento-metric-val">{parsed.val}</span>
                        <span className="bento-metric-heading">{parsed.heading}</span>
                        {parsed.sub && <p className="bento-metric-sub">{parsed.sub}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Delivering Real-World Engineering Value */}
        <ScrollReveal>
          <div className="tenets-section">
            <p className="eyebrow">Engineering Principles</p>
            <h3>Delivering <span className="gradient-text">Real-World Value</span> on Production Floors</h3>
            <p className="section-lead">
              Moving robotics from research prototypes to 24/7 industrial deployment requires solving hardware latency, sensor noise, and physical safety.
            </p>
          </div>
        </ScrollReveal>

        <div className="tenets-spec-list">
          {about.tenets.map((t, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="tenet-spec-row">
                <div className="tenet-spec-left">
                  <span className="tenet-spec-index">0{i + 1}</span>
                  <div className="tenet-spec-icon">{ABOUT_ICON_MAP[t.iconName] || <Zap size={20} />}</div>
                  <div className="tenet-spec-titles">
                    <h4 className="tenet-spec-title">{t.title}</h4>
                    <span className="tenet-spec-tagline">{t.tagline}</span>
                  </div>
                </div>
                <div className="tenet-spec-body">
                  <p>{t.body}</p>
                </div>
                <div className="tenet-spec-metric">
                  <div className="tenet-metric-callout evidence-hoverable" tabIndex={0}>
                    <span>{t.metricCallout}</span>
                    {t.evidenceTooltip && (
                      <div className="evidence-tooltip">
                        <strong>How measured</strong>
                        <p>{t.evidenceTooltip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Physical AI & Robot Learning */}
        <ScrollReveal>
          <div style={{ marginTop: "5rem" }}>
            <p className="eyebrow">Embodied Intelligence</p>
            <h3 style={{ marginBottom: "0.75rem" }}>
              Physical AI <span className="gradient-text">&amp; Robot Learning</span>
            </h3>
            <p className="section-lead">
              Focused on reproducible demonstration data, policy training, simulation evaluation, and sim-to-real workflows for humanoid manipulation.
            </p>
          </div>
        </ScrollReveal>

        <div className="physical-ai-bento-grid">
          {about.exploring.map((exp, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="pai-bento-card">
                <div className="pai-bento-header">
                  <div className="pai-bento-category">
                    <span className="pai-bento-index">0{i + 1}</span>
                    <span className="pai-bento-tag">Track 0{i + 1}</span>
                  </div>
                  {exp.status && (
                    <span className={`status-pill status-${exp.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="status-indicator-dot" />
                      <span>{exp.status}</span>
                    </span>
                  )}
                </div>

                <div className="pai-bento-title-row">
                  <div className="pai-bento-icon">{ABOUT_ICON_MAP[exp.iconName] || <Cpu size={20} />}</div>
                  <h4 className="pai-bento-title">{exp.title}</h4>
                </div>

                <p className="pai-bento-desc">{exp.desc}</p>

                {exp.tags && exp.tags.length > 0 && (
                  <div className="pai-bento-tags">
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="pai-bento-tag-pill">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Now Building Roadmap */}
        {about.nowBuilding && (
          <>
            <ScrollReveal>
              <div className="now-building-section">
                <p className="eyebrow">Technical Roadmap</p>
                <h3>Now <span className="gradient-text">Building</span></h3>
                <p className="section-lead">
                  Current six-month technical focus areas across advanced robot learning, humanoid control, and embodied AI systems.
                </p>
              </div>
            </ScrollReveal>

            <div className="now-building-grid">
              {about.nowBuilding.map((item, i) => (
                <ScrollReveal key={i} delay={(i % 3) + 1}>
                  <div className="now-building-card">
                    <div className="now-building-header">
                      <h4 className="now-building-title">{item.title}</h4>
                      <span className={`status-pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="now-building-desc">{item.desc}</p>
                    <div className="now-building-tags">
                      {item.tags.map((t, j) => (
                        <span key={j} className="now-building-tag">{t}</span>
                      ))}
                    </div>
                    {item.linkHref && item.linkText && (
                      <a href={item.linkHref} className="now-building-link">
                        <span>{item.linkText}</span>
                        <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
