import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen, Terminal } from "lucide-react";
import { getBlogsData, BlogItem } from "../lib/content";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Engineering Articles & Research Log | Tejas Phutane",
  description:
    "Technical deep dives by Tejas Phutane on humanoid locomotion, real-time edge vision pipelines, sim-to-real transfer, and production robotics.",
};

export default function BlogIndexPage() {
  const blogs: BlogItem[] = getBlogsData();

  return (
    <>
      <Navbar />
      <main className="blog-index-page">
        <div className="container">
          {/* Breadcrumb / Back Link */}
          <div className="blog-breadcrumb">
            <Link href="/" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Portfolio Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <header className="blog-index-header">
            <div className="section-label-bar">
              <span className="section-index-spec">// ARCHIVE</span>
              <span className="section-spec-tag">TECHNICAL WRITING &amp; ENGINEERING LOGS</span>
            </div>
            <h1 className="blog-index-title">Engineering Deep Dives</h1>
            <p className="blog-index-description">
              In-depth technical writeups detailing real-world robotics engineering, hardware-in-the-loop validation, memory optimization in C++, and high-speed computer vision pipelines.
            </p>
          </header>

          {/* Articles Listing */}
          <div className="blog-index-list">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-index-card">
                <div className="blog-index-card-header">
                  <span className="blog-category-badge">{blog.category}</span>
                  <div className="blog-meta-inline">
                    <span className="blog-meta-item">
                      <Calendar size={13} />
                      <span>{blog.date}</span>
                    </span>
                    <span className="blog-meta-item">
                      <Clock size={13} />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>
                </div>

                <h2 className="blog-index-card-title">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>

                <p className="blog-index-card-summary">{blog.summary}</p>

                <div className="blog-index-card-footer">
                  <div className="blog-tag-list">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="blog-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="blog-cta-link">
                    <span>Read Deep Dive</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
