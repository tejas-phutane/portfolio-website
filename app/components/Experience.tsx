"use client";
import ScrollReveal from "./ScrollReveal";

import { getExperienceData, ExperienceItem } from "../lib/content";

const experience: ExperienceItem[] = getExperienceData();

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Experience</p>
          <h2>Career <span className="gradient-text">Journey</span></h2>
          <p className="section-lead">
            From college robotics clubs to production factory floors — each role shaped how I build reliable autonomous systems.
          </p>
        </ScrollReveal>

        <div className="timeline">
          {experience.map((exp, i) => (
            <ScrollReveal key={i}>
              <div className={`timeline-item ${exp.current ? "current" : ""}`}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  {exp.current && <div className="current-badge">Current Role</div>}
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company} · {exp.location}</p>
                  <p className="timeline-period">{exp.period}</p>
                  <p className="timeline-desc">{exp.description}</p>

                  {exp.achievements.length > 0 && (
                    <div className="impact-box">
                      <h4>Impact Delivered</h4>
                      <ul className="impact-list">
                        {exp.achievements.map((a, j) => (
                          <li key={j}>
                            <strong>{a.metric}</strong> {a.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="timeline-tags">
                    {exp.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
