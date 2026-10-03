import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { getBlogsData, BlogItem } from "../lib/content";

export default function BlogsSection() {
  const blogs: BlogItem[] = getBlogsData();

  return (
    <section id="blogs" className="section-container blogs-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-box">
          <div className="section-label-bar">
            <span className="section-index-spec">// 05</span>
            <span className="section-spec-tag">TECHNICAL ARTICLES &amp; RESEARCH LOG</span>
          </div>
          <h2 className="section-title">Engineering Deep Dives</h2>
          <p className="section-description">
            Field notes, profiling breakdowns, and architectural post-mortems from production robotics deployments, bipedal humanoid locomotion, and edge AI vision.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card">
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
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Library Link */}
        <div className="blogs-footer-cta">
          <Link href="/blog" className="btn btn-secondary blogs-archive-btn">
            <BookOpen size={16} />
            <span>Explore All Technical Notes &amp; Documentation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
