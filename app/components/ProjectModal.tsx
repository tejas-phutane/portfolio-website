"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "../lib/content";
import HumanoidArchitectureDiagram from "./HumanoidArchitectureDiagram";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <h2 id="modal-title" style={{ marginBottom: "0.5rem", paddingRight: "3rem" }}>{project.title}</h2>

        <div className="modal-header-meta">
          <span className={`modal-status status-badge ${project.statusClass}`}>
            {project.status}
          </span>
          <span className="modal-context-tag">{project.context}</span>
        </div>

        {project.imageUrl && (
          <div className="modal-hero-media">
            {project.imageUrl.endsWith(".gif") ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={project.imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={project.imageUrl.replace(".gif", ".webm")} type="video/webm" />
                <source src={project.imageUrl.replace(".gif", ".mp4")} type="video/mp4" />
                <img src={project.imageUrl} alt={project.title} />
              </video>
            ) : (
              <img src={project.imageUrl} alt={project.title} />
            )}
          </div>
        )}

        <div className="modal-section">
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </div>

        {project.caseStudy ? (
          <>
            <div className="modal-section">
              <h3>System Architecture</h3>
              <p>{project.caseStudy.systemArchitecture}</p>
              {project.caseStudy.hasArchitectureDiagram && (
                <HumanoidArchitectureDiagram />
              )}
            </div>

            <div className="modal-section">
              <h3>Safety Design</h3>
              <p>{project.caseStudy.safetyDesign}</p>
            </div>

            <div className="modal-section">
              <h3>Simulation &amp; Validation</h3>
              <p>{project.caseStudy.simulationValidation}</p>
            </div>

            <div className="modal-section">
              <h3>Demo Capabilities</h3>
              <ul className="modal-impl-list">
                {project.caseStudy.demoCapabilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Engineering Learnings</h3>
              <ul className="modal-impl-list">
                {project.caseStudy.engineeringLearnings.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {project.caseStudy.visualPlaceholders && project.caseStudy.visualPlaceholders.length > 0 && (
              <div className="modal-section">
                <h3>Technical Artifacts &amp; Field Visuals</h3>
                <div className="visual-placeholders-grid">
                  {project.caseStudy.visualPlaceholders.map((ph, i) => (
                    <div className="visual-placeholder-card" key={i}>
                      <span className="placeholder-tag">{ph.tag}</span>
                      <h4 className="placeholder-title">{ph.title}</h4>
                      <p className="placeholder-caption">{ph.caption}</p>
                      {ph.imageUrl ? (
                        <div className="placeholder-image-box">
                          <img
                            src={ph.imageUrl}
                            alt={ph.title}
                            className="artifact-real-img"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="placeholder-frame-box">
                          <span>TECHNICAL ARTIFACT</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="modal-section">
              <h3>Approach</h3>
              <p>{project.approach}</p>
            </div>

            <div className="modal-section">
              <h3>Technical Implementation</h3>
              <ul className="modal-impl-list">
                {project.implementation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="modal-section">
          <h3>Results &amp; Verification Evidence</h3>
          <div className="modal-metrics">
            {project.results.map((r, i) => (
              <div className="modal-metric" key={i}>
                <span className="modal-metric-value">{r.metric}</span>
                <span className="modal-metric-label">{r.description}</span>
                {r.evidence && (
                  <div className="modal-metric-evidence">
                    <span className="evidence-pill">How measured:</span> {r.evidence}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h3>Technology Stack</h3>
          <div className="project-tags" style={{ marginTop: "0.5rem" }}>
            {project.stack.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>

        {project.githubUrl && (
          <div className="modal-section">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: "inline-flex" }}>
              View on GitHub →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
