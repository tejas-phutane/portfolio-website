"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Eye, Brain, Layers, Zap, ShieldCheck, Activity, Target } from "lucide-react";
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
                <div className="tenet-metric-callout">
                  <span>{t.metricCallout}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* What I'm Exploring */}
        <ScrollReveal>
          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>What I&apos;m Exploring Next</h3>
            <p className="section-lead">Pushing the boundaries of what robots can perceive, plan, and execute.</p>
          </div>
        </ScrollReveal>

        <div className="exploring-grid">
          {about.exploring.map((exp, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="exploring-card">
                <div className="exploring-icon">{ABOUT_ICON_MAP[exp.iconName] || <Cpu size={22} />}</div>
                <div>
                  <h4>{exp.title}</h4>
                  <p>{exp.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
