"use client";
import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";
import { ArrowRight, Layers, Cpu, Eye, ExternalLink } from "lucide-react";

import { getProjectsData, Project } from "../lib/content";
export type { Project };

const projectsData: Project[] = getProjectsData();

const CATEGORIES = ["All", "Production Systems", "Robotics Gallery", "R&D"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-eyebrow">Engineering Portfolio</span>
            <h2 className="section-title">Selected Robotics Projects</h2>
            <p className="section-subtitle">
              Production systems, national science exhibits, and defence R&amp;D — complete with verified problem formulations, architectures, and quantified outcomes.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal>
          <div className="filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={(i % 3) + 1}>
              <div
                className="project-card"
                onClick={() => setActiveProject(project)}
              >
                <div className="project-media-wrapper">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="project-media-gradient" />
                  <span className={`status-badge ${project.statusClass}`}>
                    {project.status}
                  </span>
                </div>

                <div className="project-content">
                  <div className="project-meta-row">
                    <span className="project-context-label">{project.context}</span>
                    <span className="project-category-tag">{project.category}</span>
                  </div>

                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-desc">{project.summary}</p>

                  {project.results.length > 0 && (
                    <div className="project-metric-chips">
                      {project.results.slice(0, 3).map((r, j) => (
                        <div className="metric-chip" key={j}>
                          <span className="chip-val">{r.metric}</span>
                          <span className="chip-desc">{r.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="project-tech-pills">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="tech-pill pill-more">+{project.stack.length - 4}</span>
                    )}
                  </div>

                  <div className="project-card-footer">
                    <span
                      className="card-detail-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                    >
                      <span>Read Technical Case Study</span>
                      <ArrowRight size={14} />
                    </span>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-github-link"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View on GitHub"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
