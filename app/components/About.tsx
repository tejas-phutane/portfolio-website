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

export default function About() {
  const about: AboutData = getAboutData();

  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">About</p>
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

        {/* Key highlights */}
        <div className="about-highlights">
          {about.highlights.map((h, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="highlight-card">
                <h3>{h.title}</h3>
                {h.lines?.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
                {h.items && (
                  <ul>
                    {h.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Delivering Real-World Engineering Value */}
        <ScrollReveal>
          <div className="tenets-section">
            <p className="eyebrow">Engineering Tenets</p>
            <h3>Delivering <span className="gradient-text">Real-World Value</span> vs Conceptual Demos</h3>
            <p className="section-lead">
              Moving robotics from fragile Jupyter notebook prototypes into 24/7 industrial factory deployment requires solving the messy realities of hardware, compute, and physical environments.
            </p>
          </div>
        </ScrollReveal>

        <div className="tenets-grid">
          {about.tenets.map((t, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="tenet-card">
                <div className="tenet-header">
                  <div className="tenet-icon">{ABOUT_ICON_MAP[t.iconName] || <Zap size={20} />}</div>
                  <div>
                    <h4 className="tenet-title">{t.title}</h4>
                    <span className="tenet-tagline">{t.tagline}</span>
                  </div>
                </div>
                <p className="tenet-body">{t.body}</p>
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
            </ScrollReveal>
          ))}
        </div>

        {/* Physical AI & Robot Learning */}
        <ScrollReveal>
          <div style={{ marginTop: "4.5rem" }}>
            <p className="eyebrow">Physical AI &amp; Robot Learning</p>
            <h3 style={{ marginBottom: "0.75rem" }}>
              Physical AI <span className="gradient-text">&amp; Robot Learning</span>
            </h3>
            <p className="section-lead">
              Focus is centered on building reproducible demonstration data, policy training, simulation evaluation, and sim-to-real workflows for embodied AI.
            </p>
          </div>
        </ScrollReveal>

        <div className="exploring-grid">
          {about.exploring.map((exp, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="exploring-card">
                <div className="exploring-icon">{ABOUT_ICON_MAP[exp.iconName] || <Cpu size={22} />}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "var(--space-2)", flexWrap: "wrap" }}>
                    <h4 style={{ margin: 0 }}>{exp.title}</h4>
                    {exp.status && (
                      <span className={`status-pill status-${exp.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <p>{exp.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Now Building Roadmap */}
        {about.nowBuilding && (
          <>
            <ScrollReveal>
              <div className="now-building-section">
                <p className="eyebrow">Active Roadmap</p>
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

        {/* Continuous Learning & Development */}
        {about.continuousLearning && (
          <>
            <ScrollReveal>
              <div className="continuous-learning-section">
                <p className="eyebrow">Capability Development</p>
                <h3>Continuous <span className="gradient-text">Learning</span></h3>
                <p className="section-lead">
                  Structured capability building spanning modern AI engineering frameworks and advanced robotics engineering disciplines.
                </p>
              </div>
            </ScrollReveal>

            <div className="learning-tracks-grid">
              <ScrollReveal delay={1}>
                <div className="learning-track-card">
                  <div className="learning-track-header">
                    <div className="learning-track-icon"><Brain size={20} /></div>
                    <h4 className="learning-track-title">{about.continuousLearning.llmTrack.title}</h4>
                  </div>

                  <div className="learning-subtrack">
                    <span className="learning-subtrack-title">Completed Capabilities</span>
                    <ul className="learning-list">
                      {about.continuousLearning.llmTrack.completed.map((c, i) => (
                        <li key={i} className="learning-list-item">
                          <span className="learning-item-dot completed" aria-hidden="true" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="learning-subtrack" style={{ marginTop: "var(--space-2)" }}>
                    <span className="learning-subtrack-title">In Progress Tracks</span>
                    <ul className="learning-list">
                      {about.continuousLearning.llmTrack.inProgress.map((p, i) => (
                        <li key={i} className="learning-list-item">
                          <span className="learning-item-dot in-progress" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <div className="learning-track-card">
                  <div className="learning-track-header">
                    <div className="learning-track-icon"><Layers size={20} /></div>
                    <h4 className="learning-track-title">{about.continuousLearning.fevThemes.title}</h4>
                  </div>

                  <div className="learning-subtrack">
                    <span className="learning-subtrack-title">Core Development Themes</span>
                    <ul className="learning-list">
                      {about.continuousLearning.fevThemes.themes.map((t, i) => (
                        <li key={i} className="learning-list-item">
                          <span className="learning-item-dot focus" aria-hidden="true" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
