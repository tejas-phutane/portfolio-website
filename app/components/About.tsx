"use client";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Eye, Brain, Layers } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">About</p>
          <h2>From College Labs to <span className="gradient-text">Production Floors</span></h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="about-grid">
            <div className="about-body">
              <p>
                I&apos;m a <strong>Senior Engineer</strong> currently at FEV India, working on humanoid robotic digital
                twin systems for industrial applications. With 4+ years of hands-on experience, I design
                production-grade vision systems, real-time perception pipelines, and end-to-end robotic solutions
                that bridge hardware and software.
              </p>
              <p>
                My journey started at <strong>RGIT&apos;s Robotics Club</strong> in Mumbai, where I led simulation
                and trained 50+ students. From there, I contributed to <strong>India&apos;s first Robotics Gallery</strong> at
                Gujarat Science City — working hands-on with Pepper humanoids, UR10 arms, Da Vinci surgical robots,
                SCARA systems, and autonomous mobile platforms.
              </p>
              <p>
                At <strong>Wastefull Insights</strong>, I scaled from robotics engineer to senior engineer, architecting
                autonomous waste sorting systems that process 10,000+ objects daily. I refactored Python to C++ for
                80% compute reduction, built multi-model YOLO pipelines with DeepStream, and developed analytics
                frameworks with 91% throughput prediction accuracy.
              </p>
              <p>
                The theme has been consistent: take messy real-world problems and convert them into
                <strong> reliable, measurable systems</strong>.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Key highlights */}
        <div className="about-highlights">
          <ScrollReveal delay={1}>
            <div className="highlight-card">
              <h3>Education</h3>
              <p>B.E. Electronics &amp; Telecommunication</p>
              <p>RGIT Mumbai (2017-2021) · CGPA: 7.04</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="highlight-card">
              <h3>Currently</h3>
              <p>Senior Engineer L1 at FEV India Pvt Ltd</p>
              <p>Humanoid Digital Twin Systems</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <div className="highlight-card">
              <h3>Key Achievements</h3>
              <ul>
                <li>40% speed improvement in motion algorithms</li>
                <li>80% computational reduction (Python → C++)</li>
                <li>91% throughput prediction accuracy</li>
                <li>99%+ detection accuracy in production</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* What I'm Exploring */}
        <ScrollReveal>
          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>What I&apos;m Exploring Next</h3>
            <p className="section-lead">Pushing the boundaries of what robots can perceive, plan, and execute.</p>
          </div>
        </ScrollReveal>

        <div className="exploring-grid">
          <ScrollReveal delay={1}>
            <div className="exploring-card">
              <div className="exploring-icon"><Cpu size={22} /></div>
              <div>
                <h4>Sim-to-Real Transfer</h4>
                <p>Training in Isaac Sim and deploying policies on real hardware without constant retuning.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="exploring-card">
              <div className="exploring-icon"><Eye size={22} /></div>
              <div>
                <h4>Vision Language Models</h4>
                <p>Moving beyond class-specific detectors to systems that understand context — &quot;pick the red box left of the machine.&quot;</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <div className="exploring-card">
              <div className="exploring-icon"><Brain size={22} /></div>
              <div>
                <h4>LLMs for Task Planning</h4>
                <p>Translating high-level warehouse instructions into executable robot workflows and sequences.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={4}>
            <div className="exploring-card">
              <div className="exploring-icon"><Layers size={22} /></div>
              <div>
                <h4>Behavior Cloning</h4>
                <p>Recording expert demonstrations and distilling them into policies that work at scale.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
