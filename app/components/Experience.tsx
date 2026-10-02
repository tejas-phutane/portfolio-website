"use client";
import ScrollReveal from "./ScrollReveal";

const experience = [
  {
    current: true,
    role: "Senior Engineer L1",
    company: "FEV India Pvt Ltd",
    location: "Pune",
    period: "Feb 2026 – Present",
    description: "Working on development of humanoid robotic digital twin systems for industrial applications.",
    achievements: [],
    tags: ["Isaac Sim", "ROS2", "Digital Twin", "Humanoid Robotics"],
  },
  {
    current: false,
    role: "Senior Robotics Engineer",
    company: "Wastefull Insights",
    location: "Vadodara",
    period: "Sep 2023 – Nov 2025",
    description: "Led software architecture, perception pipeline development, and technical team coordination for autonomous robotic waste management systems.",
    achievements: [
      { metric: "40%", text: "speed improvement by redesigning motion algorithms for 3-axis gantry, reducing inertial losses and improving cycle time precision" },
      { metric: "80%", text: "computational reduction by refactoring Python to C++ for real-time processing loops" },
      { metric: "91%", text: "throughput prediction using regression models on 10,000+ daily operations for data-driven optimization" },
      { metric: "99.2%", text: "detection accuracy with sub-50ms latency in multi-stream video analytics pipeline" },
      { metric: "30%", text: "idle time reduction through custom multi-robot coordination algorithms" },
    ],
    tags: ["Python", "C++", "ROS2", "YOLO", "DeepStream", "TensorRT", "Kafka", "PostgreSQL"],
  },
  {
    current: false,
    role: "Robotics Engineer",
    company: "Wastefull Insights",
    location: "Vadodara",
    period: "Aug 2022 – Sep 2023",
    description: "Contributed to autonomous robotic systems for waste management, focusing on perception optimization and real-time processing.",
    achievements: [
      { metric: "80%", text: "reduction in computational overhead by refactoring performance-critical modules from Python to C++" },
      { metric: "2×", text: "faster multi-model YOLO pipeline using NVIDIA DeepStream framework for waste object tracking" },
    ],
    tags: ["Python", "C++", "YOLO", "DeepStream", "OpenCV", "Docker"],
  },
  {
    current: false,
    role: "Jr. Robotics Engineer",
    company: "Engineering Services International",
    location: "Ahmedabad",
    period: "Oct 2021 – Jul 2022",
    description: "Developed exhibits for India's First Robotics Gallery at Gujarat Science City. Hands-on experience with 7+ diverse robotic platforms.",
    achievements: [
      { metric: "7+", text: "robot platforms: Pepper Humanoid, UR10, Da Vinci, SCARA, NAO, Mobile Robots, Quadruped" },
      { metric: "60%", text: "development cycle reduction through Gazebo simulation workflows" },
      { metric: "240fps", text: "vision processing for air hockey robot with real-time trajectory prediction" },
    ],
    tags: ["ROS", "MoveIt", "Gazebo", "OpenCV", "Python", "Arduino"],
  },
  {
    current: false,
    role: "Computer Vision & ROS Intern",
    company: "IN2PETA Services",
    location: "Hyderabad",
    period: "Jun 2021 – Oct 2021",
    description: "Developed autonomous pick-and-place mobile robot with object detection, path planning, and sensor fusion on NVIDIA Jetson.",
    achievements: [],
    tags: ["ROS", "OpenCV", "Python", "Jetson"],
  },
  {
    current: false,
    role: "Simulation Head",
    company: "RGIT's Robotics Club",
    location: "Mumbai",
    period: "Jul 2019 – Jun 2021",
    description: "Led simulation division, trained 50+ students in robotics workshops. Managed deployments for quadruped and mobile robot systems.",
    achievements: [],
    tags: ["MATLAB", "Gazebo", "ROS", "Python"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">Experience</p>
          <h2>Career <span className="gradient-text">Journey</span></h2>
          <p className="section-lead">
            From college robotics clubs to production factory floors — each role shaped how I build reliable autonomous systems.
          </p>
        </ScrollReveal>

        <div className="timeline">
          {experience.map((exp, i) => (
            <ScrollReveal key={i}>
              <div className={`timeline-item ${exp.current ? "current" : ""}`}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  {exp.current && <div className="current-badge">Current Role</div>}
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company} · {exp.location}</p>
                  <p className="timeline-period">{exp.period}</p>
                  <p className="timeline-desc">{exp.description}</p>

                  {exp.achievements.length > 0 && (
                    <div className="impact-box">
                      <h4>Impact Delivered</h4>
                      <ul className="impact-list">
                        {exp.achievements.map((a, j) => (
                          <li key={j}>
                            <strong>{a.metric}</strong> {a.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="timeline-tags">
                    {exp.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
