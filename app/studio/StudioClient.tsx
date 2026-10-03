"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./studio.css";
import {
  FolderGit2,
  Briefcase,
  Layers,
  User,
  Bot,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Project, ExperienceItem, ServiceItem, AboutData, BlogItem } from "../lib/content";

type TabType = "projects" | "experience" | "services" | "about" | "blogs" | "twin";

export default function StudioClient() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Content state
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [selectedExpIdx, setSelectedExpIdx] = useState<number>(0);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIdx, setSelectedServiceIdx] = useState<number>(0);

  const [about, setAbout] = useState<AboutData | null>(null);
  const [twinMemory, setTwinMemory] = useState<string>("");

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/studio/content");
        if (!res.ok) throw new Error("Failed to load content.");
        const data = await res.json();
        setProjects(data.projects || []);
        if (data.projects?.length) setSelectedProjectId(data.projects[0].id);

        setExperience(data.experience || []);
        setServices(data.services || []);
        setAbout(data.about || null);
        setTwinMemory(data.twinMemory || "");
        setBlogs(data.blogs || []);
        if (data.blogs?.length) setSelectedBlogSlug(data.blogs[0].slug);
      } catch (err) {
        showToast("error", "Error loading portfolio content from server.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Save current active tab or all data
  const handleSave = async (sectionToSave?: TabType) => {
    setSaving(true);
    try {
      const target = sectionToSave || activeTab;

      if (target === "projects") {
        await saveSection("projects", projects);
      } else if (target === "experience") {
        await saveSection("experience", experience);
      } else if (target === "services") {
        await saveSection("services", services);
      } else if (target === "about") {
        await saveSection("about", about);
      } else if (target === "blogs") {
        await saveSection("blogs", blogs);
      } else if (target === "twin") {
        await saveSection("twinMemory", twinMemory);
      }

      showToast("success", `Changes saved to disk! Live site refreshed.`);
    } catch (err) {
      showToast("error", "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const saveSection = async (section: string, content: any) => {
    const res = await fetch("/api/studio/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, content }),
    });
    if (!res.ok) throw new Error("Save failed");
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/studio/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        updateCurrentProject({ imageUrl: data.url });
        showToast("success", `Image uploaded to ${data.url}`);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      showToast("error", "Failed to upload image.");
    }
  };

  // Active Project Helpers
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const updateCurrentProject = (patch: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === currentProject?.id ? { ...p, ...patch } : p))
    );
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      title: "New Robotics Project",
      status: "Active Research",
      statusClass: "development",
      category: "Robotics Research",
      context: "Independent / Lab",
      imageUrl: "/images/project-placeholder-1.svg",
      summary: "Brief executive summary of the project problem, architecture, and results.",
      problem: "Describe the specific real-world challenge or bottleneck.",
      approach: "Explain your engineering solution, algorithms, and hardware integration.",
      implementation: ["Step 1 of architecture", "Step 2 of implementation"],
      results: [{ metric: "100%", description: "initial validation metric" }],
      stack: ["Python", "ROS2", "C++"],
    };

    setProjects([newProj, ...projects]);
    setSelectedProjectId(newId);
    showToast("success", "Added new project template.");
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const remaining = projects.filter((p) => p.id !== id);
    setProjects(remaining);
    if (remaining.length) setSelectedProjectId(remaining[0].id);
    showToast("success", "Project deleted.");
  };

  // Active Experience Helpers
  const currentExp = experience[selectedExpIdx] || experience[0];
  const updateCurrentExp = (patch: Partial<ExperienceItem>) => {
    setExperience((prev) =>
      prev.map((item, idx) => (idx === selectedExpIdx ? { ...item, ...patch } : item))
    );
  };

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      current: false,
      role: "Robotics Engineer",
      company: "Company Name",
      location: "City, Country",
      period: "2026 – Present",
      description: "Overview of your responsibilities and engineering achievements.",
      achievements: [{ metric: "Metric", text: "description of measurable impact" }],
      tags: ["ROS2", "C++", "Python"],
    };
    setExperience([newExp, ...experience]);
    setSelectedExpIdx(0);
    showToast("success", "Added new career position.");
  };

  const handleDeleteExperience = (idx: number) => {
    if (!confirm("Delete this experience entry?")) return;
    const remaining = experience.filter((_, i) => i !== idx);
    setExperience(remaining);
    setSelectedExpIdx(0);
  };

  // Active Service Helpers
  const currentService = services[selectedServiceIdx] || services[0];
  const updateCurrentService = (patch: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((item, idx) => (idx === selectedServiceIdx ? { ...item, ...patch } : item))
    );
  };

  const handleAddService = () => {
    const newServ: ServiceItem = {
      id: `service-${Date.now()}`,
      iconName: "Bot",
      title: "New Engineering Service",
      desc: "Comprehensive description of your consulting or development offering.",
    };
    setServices([...services, newServ]);
    setSelectedServiceIdx(services.length);
  };

  const handleDeleteService = (idx: number) => {
    if (!confirm("Delete this service offering?")) return;
    const remaining = services.filter((_, i) => i !== idx);
    setServices(remaining);
    setSelectedServiceIdx(0);
  };

  // Active Blog Helpers
  const currentBlog = blogs.find((b) => b.slug === selectedBlogSlug) || blogs[0];
  const updateCurrentBlog = (patch: Partial<BlogItem>) => {
    setBlogs((prev) =>
      prev.map((b) => (b.slug === currentBlog?.slug ? { ...b, ...patch } : b))
    );
  };

  const handleAddBlog = () => {
    const newSlug = `article-${Date.now()}`;
    const newBlog: BlogItem = {
      id: newSlug,
      slug: newSlug,
      title: "New Robotics Engineering Log",
      date: new Date().toISOString().split("T")[0],
      readTime: "6 min read",
      category: "Robotics Architecture",
      summary: "Executive summary detailing the engineering bottleneck, technical architecture, and validated results.",
      tags: ["ROS 2", "C++", "Hardware"],
      contentMarkdown: "## Architectural Problem Statement\n\nDetail the exact engineering challenges encountered...",
    };
    setBlogs([newBlog, ...blogs]);
    setSelectedBlogSlug(newSlug);
    showToast("success", "Added new technical article draft.");
  };

  const handleDeleteBlog = (slug: string) => {
    if (!confirm("Are you sure you want to delete this technical article?")) return;
    const remaining = blogs.filter((b) => b.slug !== slug);
    setBlogs(remaining);
    if (remaining.length) setSelectedBlogSlug(remaining[0].slug);
    showToast("success", "Article deleted.");
  };

  if (loading) {
    return (
      <div className="studio-container" style={{ alignItems: "center", justifyContent: "center" }}>
        <p>Loading Studio Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="studio-container">
      {/* ─── Top Header ─── */}
      <header className="studio-header">
        <div className="studio-brand-group">
          <span className="studio-title">Portfolio Studio</span>
          <span className="studio-badge">
            <span className="studio-badge-dot" />
            LOCAL DEV MODE
          </span>
        </div>

        <div className="studio-actions-group">
          <Link href="/" target="_blank" className="studio-preview-link">
            <span>View Live Site</span>
            <ExternalLink size={14} />
          </Link>
          <button
            className="studio-save-btn"
            onClick={() => handleSave()}
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* ─── Navigation Tabs ─── */}
      <nav className="studio-tabs-bar">
        <button
          className={`studio-tab ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <FolderGit2 size={16} />
          <span>Projects ({projects.length})</span>
        </button>
        <button
          className={`studio-tab ${activeTab === "experience" ? "active" : ""}`}
          onClick={() => setActiveTab("experience")}
        >
          <Briefcase size={16} />
          <span>Experience ({experience.length})</span>
        </button>
        <button
          className={`studio-tab ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <Layers size={16} />
          <span>Services ({services.length})</span>
        </button>
        <button
          className={`studio-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <User size={16} />
          <span>About & Bio</span>
        </button>
        <button
          className={`studio-tab ${activeTab === "blogs" ? "active" : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          <BookOpen size={16} />
          <span>Articles ({blogs.length})</span>
        </button>
        <button
          className={`studio-tab ${activeTab === "twin" ? "active" : ""}`}
          onClick={() => setActiveTab("twin")}
        >
          <Bot size={16} />
          <span>AI Twin Memory</span>
        </button>
      </nav>

      {/* ─── Main Content Panels ─── */}
      <main className="studio-body">
        {/* 1. PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="studio-master-detail">
            {/* Sidebar List */}
            <aside className="studio-sidebar project-list-sidebar">
              <div className="studio-sidebar-header">
                <span className="studio-sidebar-title">Select Project</span>
                <button className="studio-add-btn" onClick={handleAddProject}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="studio-item-list">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    className={`studio-sidebar-card project-sidebar-item ${
                      proj.id === currentProject?.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedProjectId(proj.id)}
                  >
                    <span className="card-primary-title">{proj.title}</span>
                    <span className="card-secondary-sub">
                      {proj.category} · {proj.status}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Detail Form */}
            <div className="studio-detail-area">
              {currentProject ? (
                <div className="studio-form-container">
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Project Overview</span>
                      <button
                        className="studio-delete-main-btn"
                        onClick={() => handleDeleteProject(currentProject.id)}
                      >
                        <Trash2 size={14} /> Delete Project
                      </button>
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Title</label>
                        <input
                          name="title"
                          type="text"
                          className="studio-input"
                          value={currentProject.title}
                          onChange={(e) => updateCurrentProject({ title: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Category</label>
                        <select
                          name="category"
                          className="studio-select"
                          value={currentProject.category}
                          onChange={(e) => updateCurrentProject({ category: e.target.value })}
                        >
                          <option value="Production Systems">Production Systems</option>
                          <option value="Robotics Gallery">Robotics Gallery</option>
                          <option value="Robotics Research">Robotics Research</option>
                          <option value="R&D">R&D</option>
                          <option value="Computer Vision">Computer Vision</option>
                        </select>
                      </div>
                    </div>

                    <div className="studio-grid-3">
                      <div className="studio-field-group">
                        <label className="studio-label">Status Label</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentProject.status}
                          onChange={(e) => updateCurrentProject({ status: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Status Badge Class</label>
                        <select
                          className="studio-select"
                          value={currentProject.statusClass}
                          onChange={(e) => updateCurrentProject({ statusClass: e.target.value })}
                        >
                          <option value="production">production (Emerald)</option>
                          <option value="development">development (Cobalt)</option>
                          <option value="completed">completed (Muted)</option>
                          <option value="competition">competition (Amber)</option>
                        </select>
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Context / Organization</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentProject.context}
                          onChange={(e) => updateCurrentProject({ context: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Image Preview & Upload */}
                    <div className="studio-field-group">
                      <label className="studio-label">Project Image / Media</label>
                      <div className="studio-image-preview-box">
                        <img
                          src={currentProject.imageUrl}
                          alt={currentProject.title}
                          className="studio-thumbnail"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/project-placeholder-1.svg";
                          }}
                        />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                          <input
                            type="text"
                            className="studio-input"
                            value={currentProject.imageUrl}
                            onChange={(e) => updateCurrentProject({ imageUrl: e.target.value })}
                            placeholder="/images/my-image.png"
                          />
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <button
                              type="button"
                              className="studio-upload-btn"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload size={14} /> Upload New Image
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Summary</label>
                      <textarea
                        name="summary"
                        className="studio-textarea"
                        value={currentProject.summary}
                        onChange={(e) => updateCurrentProject({ summary: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Problem & Approach */}
                  <div className="studio-form-section">
                    <span className="form-section-title">Deep Dive Formulation</span>
                    <div className="studio-field-group">
                      <label className="studio-label">The Problem / Operational Challenge</label>
                      <textarea
                        className="studio-textarea"
                        value={currentProject.problem}
                        onChange={(e) => updateCurrentProject({ problem: e.target.value })}
                      />
                    </div>
                    <div className="studio-field-group">
                      <label className="studio-label">Engineering Approach & Architecture</label>
                      <textarea
                        className="studio-textarea"
                        value={currentProject.approach}
                        onChange={(e) => updateCurrentProject({ approach: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Implementation Steps */}
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Implementation Highlights</span>
                      <button
                        type="button"
                        className="studio-add-btn"
                        onClick={() =>
                          updateCurrentProject({
                            implementation: [...currentProject.implementation, "New step"],
                          })
                        }
                      >
                        <Plus size={14} /> Add Step
                      </button>
                    </div>
                    {currentProject.implementation.map((step, idx) => (
                      <div key={idx} className="repeater-row">
                        <input
                          type="text"
                          className="studio-input"
                          style={{ flex: 1 }}
                          value={step}
                          onChange={(e) => {
                            const updated = [...currentProject.implementation];
                            updated[idx] = e.target.value;
                            updateCurrentProject({ implementation: updated });
                          }}
                        />
                        <button
                          type="button"
                          className="delete-row-btn"
                          onClick={() => {
                            const updated = currentProject.implementation.filter((_, i) => i !== idx);
                            updateCurrentProject({ implementation: updated });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Results & Metrics */}
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Key Results & Quantified Metrics</span>
                      <button
                        type="button"
                        className="studio-add-btn"
                        onClick={() =>
                          updateCurrentProject({
                            results: [...currentProject.results, { metric: "Metric", description: "Outcome" }],
                          })
                        }
                      >
                        <Plus size={14} /> Add Metric
                      </button>
                    </div>
                    {currentProject.results.map((res, idx) => (
                      <div key={idx} className="repeater-row">
                        <input
                          type="text"
                          className="studio-input"
                          style={{ width: "120px" }}
                          placeholder="Metric (e.g. 99.2%)"
                          value={res.metric}
                          onChange={(e) => {
                            const updated = [...currentProject.results];
                            updated[idx].metric = e.target.value;
                            updateCurrentProject({ results: updated });
                          }}
                        />
                        <input
                          type="text"
                          className="studio-input"
                          style={{ flex: 1 }}
                          placeholder="Description (e.g. detection accuracy)"
                          value={res.description}
                          onChange={(e) => {
                            const updated = [...currentProject.results];
                            updated[idx].description = e.target.value;
                            updateCurrentProject({ results: updated });
                          }}
                        />
                        <button
                          type="button"
                          className="delete-row-btn"
                          onClick={() => {
                            const updated = currentProject.results.filter((_, i) => i !== idx);
                            updateCurrentProject({ results: updated });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="studio-form-section">
                    <span className="form-section-title">Tech Stack Tags</span>
                    <input
                      type="text"
                      className="studio-input"
                      placeholder="ROS2, C++, Python, Isaac Sim (comma separated)"
                      value={currentProject.stack.join(", ")}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        updateCurrentProject({ stack: tags });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p>No project selected.</p>
              )}
            </div>
          </div>
        )}

        {/* 2. EXPERIENCE MANAGER */}
        {activeTab === "experience" && (
          <div className="studio-master-detail experience-manager">
            <aside className="studio-sidebar">
              <div className="studio-sidebar-header">
                <span className="studio-sidebar-title">Career Roles</span>
                <button className="studio-add-btn" onClick={handleAddExperience}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="studio-item-list">
                {experience.map((exp, idx) => (
                  <button
                    key={idx}
                    className={`studio-sidebar-card ${idx === selectedExpIdx ? "active" : ""}`}
                    onClick={() => setSelectedExpIdx(idx)}
                  >
                    <span className="card-primary-title">
                      {exp.role} {exp.current && "· (Current)"}
                    </span>
                    <span className="card-secondary-sub">{exp.company}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="studio-detail-area">
              {currentExp ? (
                <div className="studio-form-container">
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Position Details</span>
                      <button
                        className="studio-delete-main-btn"
                        onClick={() => handleDeleteExperience(selectedExpIdx)}
                      >
                        <Trash2 size={14} /> Delete Position
                      </button>
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Role Title</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentExp.role}
                          onChange={(e) => updateCurrentExp({ role: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Company Name</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentExp.company}
                          onChange={(e) => updateCurrentExp({ company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Location</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentExp.location}
                          onChange={(e) => updateCurrentExp({ location: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Date Period</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentExp.period}
                          onChange={(e) => updateCurrentExp({ period: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="studio-field-group" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <input
                        type="checkbox"
                        id="current-role-checkbox"
                        checked={currentExp.current}
                        onChange={(e) => updateCurrentExp({ current: e.target.checked })}
                      />
                      <label htmlFor="current-role-checkbox" style={{ fontSize: "0.85rem", color: "#f8fafc" }}>
                        Mark as Current Active Role (displays glowing beacon badge)
                      </label>
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Overview Description</label>
                      <textarea
                        className="studio-textarea"
                        value={currentExp.description}
                        onChange={(e) => updateCurrentExp({ description: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Impact Delivered</span>
                      <button
                        type="button"
                        className="studio-add-btn"
                        onClick={() =>
                          updateCurrentExp({
                            achievements: [...currentExp.achievements, { metric: "Metric", text: "Achievement text" }],
                          })
                        }
                      >
                        <Plus size={14} /> Add Achievement
                      </button>
                    </div>

                    {currentExp.achievements.map((ach, idx) => (
                      <div key={idx} className="repeater-row">
                        <input
                          type="text"
                          className="studio-input"
                          style={{ width: "130px" }}
                          placeholder="Metric"
                          value={ach.metric}
                          onChange={(e) => {
                            const updated = [...currentExp.achievements];
                            updated[idx].metric = e.target.value;
                            updateCurrentExp({ achievements: updated });
                          }}
                        />
                        <input
                          type="text"
                          className="studio-input"
                          style={{ flex: 1 }}
                          placeholder="Achievement details"
                          value={ach.text}
                          onChange={(e) => {
                            const updated = [...currentExp.achievements];
                            updated[idx].text = e.target.value;
                            updateCurrentExp({ achievements: updated });
                          }}
                        />
                        <button
                          type="button"
                          className="delete-row-btn"
                          onClick={() => {
                            const updated = currentExp.achievements.filter((_, i) => i !== idx);
                            updateCurrentExp({ achievements: updated });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="studio-form-section">
                    <span className="form-section-title">Skill Tags</span>
                    <input
                      type="text"
                      className="studio-input"
                      placeholder="ROS2, C++, DeepStream, TensorRT (comma separated)"
                      value={currentExp.tags.join(", ")}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        updateCurrentExp({ tags });
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* 3. SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="studio-master-detail services-manager">
            <aside className="studio-sidebar">
              <div className="studio-sidebar-header">
                <span className="studio-sidebar-title">Service Offerings</span>
                <button className="studio-add-btn" onClick={handleAddService}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="studio-item-list">
                {services.map((serv, idx) => (
                  <button
                    key={idx}
                    className={`studio-sidebar-card ${idx === selectedServiceIdx ? "active" : ""}`}
                    onClick={() => setSelectedServiceIdx(idx)}
                  >
                    <span className="card-primary-title">{serv.title}</span>
                    <span className="card-secondary-sub">Icon: {serv.iconName}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="studio-detail-area">
              {currentService ? (
                <div className="studio-form-container">
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Service Details</span>
                      <button
                        className="studio-delete-main-btn"
                        onClick={() => handleDeleteService(selectedServiceIdx)}
                      >
                        <Trash2 size={14} /> Delete Service
                      </button>
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Service Title</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentService.title}
                          onChange={(e) => updateCurrentService({ title: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Icon</label>
                        <select
                          className="studio-select"
                          value={currentService.iconName}
                          onChange={(e) => updateCurrentService({ iconName: e.target.value })}
                        >
                          <option value="Cog">Cog (Engineering / Mechanical)</option>
                          <option value="Eye">Eye (Vision / Inspection)</option>
                          <option value="Layers">Layers (Simulation / Digital Twin)</option>
                          <option value="Bot">Bot (Robotics / Humanoid)</option>
                          <option value="Cpu">Cpu (Embedded / Hardware)</option>
                          <option value="Zap">Zap (Optimization / Low-Latency)</option>
                          <option value="Users">Users (Workshops / Training)</option>
                          <option value="UserCheck">UserCheck (Mentorship)</option>
                          <option value="Mic">Mic (Conference Speaking)</option>
                          <option value="Code">Code (Open-Source)</option>
                          <option value="Activity">Activity (Diagnostics)</option>
                        </select>
                      </div>
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Service Description</label>
                      <textarea
                        className="studio-textarea"
                        style={{ minHeight: "120px" }}
                        value={currentService.desc}
                        onChange={(e) => updateCurrentService({ desc: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* 4. ABOUT & BIO MANAGER */}
        {activeTab === "about" && about && (
          <div className="studio-detail-area about-manager" style={{ width: "100%" }}>
            <div className="studio-form-container">
              <div className="studio-form-section">
                <span className="form-section-title">Section Heading</span>
                <input
                  type="text"
                  className="studio-input"
                  value={about.heading}
                  onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                />
              </div>

              <div className="studio-form-section">
                <span className="form-section-title">Bio Narrative Paragraphs</span>
                {about.paragraphs.map((para, idx) => (
                  <div key={idx} className="studio-field-group">
                    <label className="studio-label">Paragraph {idx + 1}</label>
                    <textarea
                      className="studio-textarea"
                      value={para}
                      onChange={(e) => {
                        const updated = [...about.paragraphs];
                        updated[idx] = e.target.value;
                        setAbout({ ...about, paragraphs: updated });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="studio-form-section">
                <div className="form-section-title">
                  <span>What I&apos;m Exploring Next Cards</span>
                </div>
                {about.exploring.map((exp, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Topic Title</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={exp.title}
                          onChange={(e) => {
                            const updated = [...about.exploring];
                            updated[idx].title = e.target.value;
                            setAbout({ ...about, exploring: updated });
                          }}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Icon</label>
                        <select
                          className="studio-select"
                          value={exp.iconName}
                          onChange={(e) => {
                            const updated = [...about.exploring];
                            updated[idx].iconName = e.target.value;
                            setAbout({ ...about, exploring: updated });
                          }}
                        >
                          <option value="Cpu">Cpu</option>
                          <option value="Eye">Eye</option>
                          <option value="Brain">Brain</option>
                          <option value="Layers">Layers</option>
                          <option value="Zap">Zap</option>
                        </select>
                      </div>
                    </div>
                    <div className="studio-field-group">
                      <label className="studio-label">Description</label>
                      <textarea
                        className="studio-textarea"
                        value={exp.desc}
                        onChange={(e) => {
                          const updated = [...about.exploring];
                          updated[idx].desc = e.target.value;
                          setAbout({ ...about, exploring: updated });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ARTICLES & BLOGS MANAGER */}
        {activeTab === "blogs" && (
          <div className="studio-master-detail">
            {/* Sidebar List */}
            <aside className="studio-sidebar project-list-sidebar">
              <div className="studio-sidebar-header">
                <span className="studio-sidebar-title">Select Article</span>
                <button className="studio-add-btn" onClick={handleAddBlog}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="studio-item-list">
                {blogs.map((b) => (
                  <button
                    key={b.slug}
                    className={`studio-sidebar-card project-sidebar-item ${
                      b.slug === currentBlog?.slug ? "active" : ""
                    }`}
                    onClick={() => setSelectedBlogSlug(b.slug)}
                  >
                    <span className="card-primary-title">{b.title}</span>
                    <span className="card-secondary-sub">
                      {b.category} · {b.date}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Detail Form */}
            <div className="studio-detail-area">
              {currentBlog ? (
                <div className="studio-form-container">
                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Article Metadata</span>
                      <button
                        className="studio-delete-main-btn"
                        onClick={() => handleDeleteBlog(currentBlog.slug)}
                      >
                        <Trash2 size={14} /> Delete Article
                      </button>
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Article Title</label>
                      <input
                        type="text"
                        className="studio-input"
                        value={currentBlog.title}
                        onChange={(e) => updateCurrentBlog({ title: e.target.value })}
                      />
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">URL Slug</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentBlog.slug}
                          onChange={(e) => updateCurrentBlog({ slug: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Category</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentBlog.category}
                          onChange={(e) => updateCurrentBlog({ category: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="studio-grid-2">
                      <div className="studio-field-group">
                        <label className="studio-label">Publication Date</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentBlog.date}
                          onChange={(e) => updateCurrentBlog({ date: e.target.value })}
                        />
                      </div>
                      <div className="studio-field-group">
                        <label className="studio-label">Read Time</label>
                        <input
                          type="text"
                          className="studio-input"
                          value={currentBlog.readTime}
                          onChange={(e) => updateCurrentBlog({ readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Tags (comma-separated)</label>
                      <input
                        type="text"
                        className="studio-input"
                        value={currentBlog.tags.join(", ")}
                        onChange={(e) =>
                          updateCurrentBlog({
                            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          })
                        }
                      />
                    </div>

                    <div className="studio-field-group">
                      <label className="studio-label">Technical Executive Summary</label>
                      <textarea
                        className="studio-textarea"
                        style={{ minHeight: "80px" }}
                        value={currentBlog.summary}
                        onChange={(e) => updateCurrentBlog({ summary: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="studio-form-section">
                    <div className="form-section-title">
                      <span>Article Content (Markdown with Tables & Code)</span>
                    </div>
                    <textarea
                      className="studio-textarea"
                      style={{
                        minHeight: "450px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.82rem",
                        lineHeight: "1.6",
                      }}
                      value={currentBlog.contentMarkdown}
                      onChange={(e) => updateCurrentBlog({ contentMarkdown: e.target.value })}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* 6. AI TWIN MEMORY */}
        {activeTab === "twin" && (
          <div className="studio-detail-area twin-manager" style={{ width: "100%" }}>
            <div className="studio-form-container">
              <div className="studio-form-section">
                <div className="form-section-title">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={18} color="#3b82f6" />
                    <span>AI Digital Twin Knowledge Core</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  This system prompt is injected into every conversation with your AI Digital Twin.
                  Edit these sections whenever you ship a new hardware deployment, test locomotion policies, or wish to guide how the AI answers visitor inquiries.
                </p>
                <textarea
                  className="studio-textarea"
                  style={{ minHeight: "500px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: "1.6" }}
                  value={twinMemory}
                  onChange={(e) => setTwinMemory(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className={`studio-toast ${toast.type}`}>
          {toast.type === "success" ? (
            <CheckCircle size={16} color="#10b981" />
          ) : (
            <AlertCircle size={16} color="#ef4444" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
