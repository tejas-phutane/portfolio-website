"use client";
import ScrollReveal from "./ScrollReveal";
import { Cog, Eye, Code, Database, Cpu, Users, Boxes, Network, Shield, Radar, Rocket, RefreshCw } from "lucide-react";

const skillGroups = [
  {
    icon: <Cog size={20} />,
    title: "Robotics & Control",
    skills: ["ROS/ROS2", "MoveIt", "Gazebo", "Isaac Sim", "Motion Planning", "Trajectory Control", "PID Control", "Sensor Fusion", "Kalman Filtering", "SLAM", "URDF/Xacro"],
    note: "Platforms: Pepper, UR10, NAO, Da Vinci, SCARA, Mobile Robots, Quadrupeds",
  },
  {
    icon: <Eye size={20} />,
    title: "Computer Vision & AI",
    skills: ["YOLO (v3–v11)", "OpenCV", "TensorFlow", "PyTorch", "TensorRT", "DeepStream", "Triton Inference", "Object Detection", "Semantic Segmentation", "Anomalib"],
  },
  {
    icon: <Code size={20} />,
    title: "Programming",
    skills: ["Python (Expert)", "C++ (Proficient)", "MATLAB", "C", "Linux/UNIX", "CUDA", "Git", "Docker"],
  },
  {
    icon: <Cpu size={20} />,
    title: "Hardware & Edge",
    skills: ["NVIDIA Jetson Xavier", "Industrial Cameras", "3D LiDAR", "PLC (Omron)", "Arduino", "IMU Sensors", "Multi-axis Controllers"],
  },
  {
    icon: <Database size={20} />,
    title: "Data & Deployment",
    skills: ["PostgreSQL", "TimescaleDB", "Kafka", "MQTT", "Docker", "Kubernetes", "REST APIs", "Streamlit", "pandas", "scikit-learn"],
  },
  {
    icon: <Users size={20} />,
    title: "Leadership",
    skills: ["Team Leadership", "Project Management", "Mentorship", "Cross-functional Collaboration", "Technical Documentation", "Stakeholder Communication"],
  },
];

const pipeline = [
  { icon: <Boxes size={20} />, color: "cyan", title: "Simulation", tech: "Isaac Sim / Gazebo / RViz", desc: "Digital twins, physics testing, synthetic data generation" },
  { icon: <Network size={20} />, color: "cyan", title: "Planning & Middleware", tech: "ROS/ROS2, MoveIt, Nav2", desc: "IK, trajectories, collision avoidance, SLAM" },
  { icon: <Eye size={20} />, color: "purple", title: "Vision & Perception", tech: "YOLO, DeepStream, TensorRT", desc: "Real-time detection, tracking, classification" },
  { icon: <Shield size={20} />, color: "amber", title: "Control Layer", tech: "PLC, Motor Controllers, Servos", desc: "Safety I/O, real-time control loops" },
  { icon: <Radar size={20} />, color: "cyan", title: "Sensing", tech: "Cameras, LiDAR, IMU", desc: "Sensor fusion, calibration, data pipelines" },
  { icon: <Rocket size={20} />, color: "amber", title: "Deployment", tech: "Jetson, Docker, Edge", desc: "Production builds, monitoring, analytics" },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Skills</p>
          <h2>Technical <span className="gradient-text">Arsenal</span></h2>
          <p className="section-lead">
            Comprehensive toolkit built through 4+ years of production robotics and computer vision deployment.
          </p>
        </ScrollReveal>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={i} delay={(i % 3) + 1}>
              <div className="skill-category">
                <div className="skill-category-header">
                  <div className="skill-category-icon">{group.icon}</div>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                {group.note && <p className="skill-platforms">{group.note}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pipeline Visualization */}
        <div className="pipeline-section">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "var(--space-10)", position: "relative" }}>
              <h3>
                <span style={{ color: "var(--accent-primary)" }}>Concept</span> → <span style={{ color: "var(--accent-amber)" }}>Deployment</span> Pipeline
              </h3>
              <p className="section-lead" style={{ maxWidth: "700px", margin: "var(--space-3) auto 0" }}>
                End-to-end robotics pipeline from simulation through perception, control, and production deployment.
              </p>
            </div>
          </ScrollReveal>

          <div className="pipeline-grid">
            {pipeline.map((item, i) => (
              <ScrollReveal key={i} delay={(i % 3) + 1}>
                <div className={`pipeline-card ${item.color}`}>
                  <div className="pipeline-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p className="pipeline-tech">{item.tech}</p>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
