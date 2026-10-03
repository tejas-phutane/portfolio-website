import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, Tag, User, BookOpen, Share2 } from "lucide-react";
import { getBlogsData, getBlogBySlug, BlogItem } from "../../lib/content";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getBlogsData();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Tejas Phutane",
    };
  }

  return {
    title: `${blog.title} | Tejas Phutane`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      type: "article",
      authors: ["Tejas Phutane"],
    },
  };
}

// Clean markdown parser helper for article body
function renderArticleContent(markdown: string) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let currentTable: string[][] = [];
  let inTable = false;
  let codeBlock: string[] = [];
  let inCode = false;
  let codeLang = "";

  const flushTable = (key: number) => {
    if (!currentTable.length) return null;
    const headerRow = currentTable[0];
    const dataRows = currentTable.slice(1).filter((r) => !r.every((c) => /^:?-+:?$/.test(c.trim())));

    const tableNode = (
      <div key={`table-${key}`} className="article-table-wrapper">
        <table className="article-table">
          <thead>
            <tr>
              {headerRow.map((cell, cIdx) => (
                <th key={cIdx}>{cell.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    currentTable = [];
    inTable = false;
    return tableNode;
  };

  const flushCode = (key: number) => {
    const codeNode = (
      <pre key={`code-${key}`} className="article-code-block">
        {codeLang && <div className="code-lang-tag">{codeLang}</div>}
        <code>{codeBlock.join("\n")}</code>
      </pre>
    );
    codeBlock = [];
    inCode = false;
    codeLang = "";
    return codeNode;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith("```")) {
      if (inCode) {
        elements.push(flushCode(i));
      } else {
        if (inTable) elements.push(flushTable(i));
        inCode = true;
        codeLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCode) {
      codeBlock.push(line);
      continue;
    }

    // Markdown Table parsing
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      const cells = line
        .trim()
        .slice(1, -1)
        .split("|");
      currentTable.push(cells);
      continue;
    } else if (inTable) {
      elements.push(flushTable(i));
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="article-divider" />);
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="article-h3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="article-h2">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="article-h1">
          {line.slice(2)}
        </h1>
      );
      continue;
    }

    // Bullet items
    if (line.trim().startsWith("- ") || line.trim().startsWith("• ") || line.trim().startsWith("* ")) {
      const bulletContent = line.trim().slice(2);
      // Parse bold
      const parts = bulletContent.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <li key={i} className="article-bullet-item">
          {parts.map((p, pIdx) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={pIdx}>{p.slice(2, -2)}</strong>
            ) : (
              p
            )
          )}
        </li>
      );
      continue;
    }

    // Numbered lists
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      const parts = numMatch[2].split(/(\*\*.*?\*\*)/g);
      elements.push(
        <li key={i} className="article-numbered-item">
          <span className="num-prefix">{numMatch[1]}.</span>
          <span>
            {parts.map((p, pIdx) =>
              p.startsWith("**") && p.endsWith("**") ? (
                <strong key={pIdx}>{p.slice(2, -2)}</strong>
              ) : (
                p
              )
            )}
          </span>
        </li>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      continue;
    }

    // Regular paragraphs with bold parsing
    const parts = line.split(/(\*\*.*?\*\*)/g);
    elements.push(
      <p key={i} className="article-paragraph">
        {parts.map((p, pIdx) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={pIdx}>{p.slice(2, -2)}</strong>
          ) : (
            p
          )
        )}
      </p>
    );
  }

  if (inTable) elements.push(flushTable(lines.length));
  if (inCode) elements.push(flushCode(lines.length));

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = getBlogsData();
  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="blog-post-page">
        <article className="container article-container">
          {/* Back Navigation Bar */}
          <nav className="article-top-nav">
            <Link href="/blog" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to All Technical Articles</span>
            </Link>
          </nav>

          {/* Article Header */}
          <header className="article-header">
            <div className="article-meta-badge-row">
              <span className="blog-category-badge">{blog.category}</span>
              <span className="article-spec-tag">DOC_REF // {blog.slug.toUpperCase()}</span>
            </div>

            <h1 className="article-main-title">{blog.title}</h1>

            <p className="article-lead-summary">{blog.summary}</p>

            <div className="article-byline-bar">
              <div className="byline-author">
                <div className="author-avatar-dot">TP</div>
                <div>
                  <div className="author-name">Tejas Phutane</div>
                  <div className="author-role">Senior Robotics &amp; Computer Vision Engineer</div>
                </div>
              </div>

              <div className="byline-metrics">
                <span className="byline-item">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </span>
                <span className="byline-item">
                  <Clock size={14} />
                  <span>{blog.readTime}</span>
                </span>
              </div>
            </div>

            <div className="article-tags-strip">
              {blog.tags.map((tag, tIdx) => (
                <span key={tIdx} className="blog-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <hr className="article-header-divider" />

          {/* Table of Contents / Architectural Breakdown */}
          {blog.contentMarkdown.includes("## ") && (
            <div className="article-toc">
              <span className="toc-title">// ARCHITECTURAL SECTIONS</span>
              <ul className="toc-list">
                {blog.contentMarkdown
                  .split("\n")
                  .filter((line) => line.startsWith("## "))
                  .map((line, hIdx) => (
                    <li key={hIdx} className="toc-item">
                      <span className="toc-index">0{hIdx + 1}.</span>
                      <span className="toc-text">{line.replace(/^##\s+/, "").trim()}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Article Markdown Body */}
          <div className="article-body">
            {renderArticleContent(blog.contentMarkdown)}
          </div>

          {/* Article Footer & Author Signature */}
          <footer className="article-footer-box">
            <div className="author-bio-card">
              <div className="author-bio-header">
                <div className="author-name-title">Tejas Phutane</div>
                <div className="author-subtitle">FEV India · Unitree G1 Humanoid &amp; Sim-to-Real</div>
              </div>
              <p className="author-bio-text">
                Senior Robotics &amp; Computer Vision Engineer with 4+ years architecting autonomous systems, bipedal locomotion policies, and real-time edge perception pipelines. Open to Staff / Senior engineering leadership roles.
              </p>
              <div className="author-contact-links">
                <Link href="/#contact" className="btn btn-primary btn-sm">
                  Get In Touch
                </Link>
                <Link href="/blog" className="btn btn-secondary btn-sm">
                  Read More Notes
                </Link>
              </div>
            </div>
          </footer>

          {/* Related Articles Section */}
          {otherBlogs.length > 0 && (
            <div className="related-articles-section">
              <h3 className="related-heading">// MORE ENGINEERING DEEP DIVES</h3>
              <div className="related-grid">
                {otherBlogs.map((other) => (
                  <Link key={other.id} href={`/blog/${other.slug}`} className="related-card">
                    <span className="blog-category-badge">{other.category}</span>
                    <h4 className="related-title">{other.title}</h4>
                    <span className="related-meta">
                      <Clock size={12} />
                      <span>{other.readTime}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
