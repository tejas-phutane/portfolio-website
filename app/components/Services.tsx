"use client";
import ScrollReveal from "./ScrollReveal";
import { Cog, Eye, Users, UserCheck, Mic, Layers, Code } from "lucide-react";

const services = [
  { icon: <Cog size={24} />, title: "Robotics Engineering Consulting", desc: "End-to-end design and development of autonomous robotic systems for industrial applications — motion planning, control systems, hardware integration, and production deployment." },
  { icon: <Eye size={24} />, title: "Computer Vision & AI Solutions", desc: "Custom vision systems, object detection, segmentation, and AI/ML deployment on edge devices. From training pipelines to TensorRT-optimized production inference." },
  { icon: <Layers size={24} />, title: "Digital Twin Development", desc: "Virtual representations of physical systems for simulation, testing, and optimization. Sim-to-real transfer techniques for seamless virtual-to-physical deployment." },
  { icon: <Users size={24} />, title: "Technical Workshops & Training", desc: "Hands-on robotics and computer vision workshops for students, professionals, and organizations. Topics include ROS, computer vision, and embedded systems." },
  { icon: <UserCheck size={24} />, title: "Mentorship & Code Reviews", desc: "One-on-one mentorship for robotics projects, code reviews, and guidance on best practices in autonomous systems development." },
  { icon: <Mic size={24} />, title: "Conference Speaking", desc: "Technical presentations at robotics conferences sharing insights on production-grade vision systems and AI-accelerated development." },
  { icon: <Code size={24} />, title: "Open-Source Collaboration", desc: "Collaboration on open-source robotics projects, code contributions, and community-driven initiatives to advance robotics technology." },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Services</p>
          <h2>What I <span className="gradient-text">Offer</span></h2>
          <p className="section-lead">
            Professional consulting and development services for robotics, computer vision, and industrial automation.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={(i % 3) + 1}>
              <div className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
