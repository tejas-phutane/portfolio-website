"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Cog, Eye, Users, UserCheck, Mic, Layers, Code, Bot, Cpu, Zap, Activity } from "lucide-react";
import { getServicesData, ServiceItem } from "../lib/content";

const ICON_MAP: Record<string, React.ReactNode> = {
  Cog: <Cog size={24} />,
  Eye: <Eye size={24} />,
  Layers: <Layers size={24} />,
  Users: <Users size={24} />,
  UserCheck: <UserCheck size={24} />,
  Mic: <Mic size={24} />,
  Code: <Code size={24} />,
  Bot: <Bot size={24} />,
  Cpu: <Cpu size={24} />,
  Zap: <Zap size={24} />,
  Activity: <Activity size={24} />,
};

export default function Services() {
  const services: ServiceItem[] = getServicesData();

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
            <ScrollReveal key={s.id || i} delay={(i % 3) + 1}>
              <div className="service-card">
                <div className="service-icon">{ICON_MAP[s.iconName] || <Cog size={24} />}</div>
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
