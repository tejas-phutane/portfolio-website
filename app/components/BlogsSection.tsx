"use client";
import React from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, BookOpen, Clock, Tag, Cpu, FileText } from "lucide-react";
import { getBlogsData, BlogItem } from "../lib/content";

export default function BlogsSection() {
  const blogs: BlogItem[] = getBlogsData();

  return (
    <section id="blogs" className="section blogs-section">
      <div className="container">
        {/* Consistent Section Header */}
        <ScrollReveal>
          <div className="section-header">
            <span className="section-eyebrow">Engineering Research Log</span>
            <h2 className="section-title">Technical Articles &amp; Research Log</h2>
            <p className="section-subtitle">
              Field notes, profiling breakdowns, and architectural post-mortems from production robotics deployments, bipedal humanoid locomotion, and edge AI vision.
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="blogs-grid">
          {blogs.map((blog, i) => (
            <article
              key={blog.id || blog.slug}
              className="blog-card"
              style={{ animationDelay: `${(i % 2) * 0.1}s` }}
            >
              {/* Unique Visual Preview Header */}
              {(blog.heroImage || blog.diagramImage) && (
                <Link href={`/blog/${blog.slug}`} className="blog-card-media-preview" tabIndex={-1}>
                  <img
                    src={blog.heroImage || blog.diagramImage}
                    alt={`${blog.title} Visual Preview`}
                    className="blog-card-media-thumb"
                    loading="lazy"
                  />
                  <div className="blog-card-media-overlay">
                    <span className="blog-card-media-tag">
                      <span className="blog-pulse-indicator" />
                      <span>{blog.category}</span>
                    </span>
                  </div>
                </Link>
              )}

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-category-badge">{blog.category}</span>
                  <span className="blog-read-time">
                    <Clock size={12} />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <h3 className="blog-card-title">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="blog-card-summary">{blog.summary}</p>

                <div className="blog-card-tags">
                  {blog.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="blog-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="blog-card-footer">
                  <span className="blog-date">{blog.date}</span>
                  <Link href={`/blog/${blog.slug}`} className="blog-read-link">
                    <span>Read Article &amp; Architecture</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Library Link */}
        <ScrollReveal>
          <div className="blogs-footer-cta">
            <Link href="/blog" className="btn btn-secondary blogs-archive-btn">
              <BookOpen size={16} />
              <span>Explore All Technical Notes &amp; Documentation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
