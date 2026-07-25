"use client";

import React, { useState, useEffect } from "react";
import {
  User as UserIcon,
  Wrench,
  Briefcase,
  Folder,
  Settings,
  Mail,
  Phone,
  MapPin,
  Cog,
  Eye,
  Users,
  UserCheck,
  Mic,
  Layers,
  X
} from "lucide-react";

// Brand SVG components to replace removed lucide-react brand icons
interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const GithubIcon = ({ size = 24, ...props }: CustomIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: CustomIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Project {
  title: string;
  status: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  problem: string;
  approach: string;
  implementation: string[];
  results: { metric: string; description: string }[];
  stack: string[];
  githubUrl?: string;
}

const projectsData: Record<string, Project> = {
  "multi-stream-analytics": {
    title: "Multi-Stream Video Analytics Platform",
    status: "Production Deployed",
    imageUrl: "/images/multi-stream-analytics.png",
    problem: "Real-time inventory tracking across 4 processing lines. Manual counting was error-prone (75% accuracy) and labor-intensive. System needed to process multiple high-resolution streams simultaneously with sub-50ms latency per frame.",
    approach: "Built GPU-accelerated multi-stream pipeline using NVIDIA DeepStream SDK. Custom YOLOv5 model trained on 8,000+ annotated images. TensorRT optimization reduced latency by 50%. Kafka handles streaming analytics, TimescaleDB stores time-series data.",
    implementation: [
      "4-camera RTSP feed ingestion with failover handling",
      "YOLOv5 object detection + secondary SKU classification",
      "TensorRT engine for 50% latency improvement",
      "Kafka pipeline for distributed real-time analytics",
      "Streamlit dashboard for monitoring"
    ],
    results: [
      { metric: "99.2%", description: "detection accuracy" },
      { metric: "42ms", description: "avg latency" },
      { metric: "4 streams", description: "concurrent" },
      { metric: "85%", description: "labor reduction" }
    ],
    stack: ["Python", "C++", "YOLOv5", "DeepStream", "TensorRT", "Kafka", "TimescaleDB"]
  },
  "valve-inspection": {
    title: "Valve Guide Vision QC System",
    status: "In Progress",
    imageUrl: "/images/vision-inspection-system-for-metal-components.jpg",
    problem: "Automated visual inspection for precision manufacturing with ±100 micron tolerance. Legacy system had no QC capability.",
    approach: "High-resolution line-scan camera with precision optics. CNN-based defect detection trained on 5000+ samples. PLC integration for production line synchronization.",
    implementation: [
      "High-resolution line-scan camera system with precision optics",
      "Custom CNN architecture based on ResNet50",
      "Training on 5000+ labeled defect samples",
      "NVIDIA Triton inference server for real-time processing",
      "PLC integration for production line control",
      "MLflow for model versioning and experiment tracking"
    ],
    results: [
      { metric: "96.3%", description: "defect detection" },
      { metric: "3 sec", description: "per part" },
      { metric: "50µ", description: "min defect size" },
      { metric: "<2%", description: "false positives" }
    ],
    stack: ["CNN", "Triton", "PLC", "MLflow", "Hikvision Cameras"]
  },
  "waste-sorting-robot": {
    title: "Vision and Robot for Sorting Random Objects on Conveyor",
    status: "Production",
    imageUrl: "/images/waste-vision-box.jpeg",
    fallbackImageUrl: "/images/waste-detection.jpeg",
    problem: "Manual sorting of waste on conveyor belts was inefficient and labor-intensive. Needed automated system to identify and sort various objects for recycling optimization.",
    approach: "Integrated computer vision pipeline with robotic manipulation. YOLO-based object detection for real-time classification, ROS2 for robot control and coordination.",
    implementation: [
      "High-resolution camera system for object detection on moving conveyor",
      "YOLOv8 model trained on diverse waste object dataset",
      "ROS2 nodes for vision processing and robot control",
      "Conveyor synchronization with robotic picking cycles",
      "Real-time decision making for sorting categories"
    ],
    results: [
      { metric: "95%", description: "sorting accuracy" },
      { metric: "300", description: "objects/min" },
      { metric: "60%", description: "labor reduction" },
      { metric: "<500ms", description: "response time" }
    ],
    stack: ["ROS2", "YOLOv8", "OpenCV", "Python", "C++", "TensorRT"]
  },
  "pepper-robot": {
    title: "Pepper Humanoid Integration",
    status: "Completed",
    imageUrl: "/images/pepper.webp",
    problem: "Enhance Pepper robot interactivity for public exhibitions with face recognition and object detection capabilities.",
    approach: "Integrated YOLOv3 for real-time object detection and NAOqi SDK for robot control. Added face recognition using OpenCV and custom choreography programming.",
    implementation: [
      "YOLOv3 integration for object detection",
      "Face recognition pipeline using OpenCV",
      "NAOqi SDK for robot control and behaviors",
      "Custom choreography programming",
      "Real-time interaction handling"
    ],
    results: [
      { metric: "95%", description: "recognition accuracy" },
      { metric: "500+", description: "visitors interacted" },
      { metric: "10+", description: "custom behaviors" },
      { metric: "Real-time", description: "response time" }
    ],
    stack: ["Python", "YOLOv3", "OpenCV", "NAOqi SDK"]
  },
  "da-vinci-robot": {
    title: "Da Vinci Gesture Control",
    status: "Completed",
    imageUrl: "/images/da-vinci.avif",
    problem: "Retrofit medical robot with modern gesture-based control interface for educational demonstrations.",
    approach: "Integrated Leap Motion sensor with ROS platform. Developed gesture recognition algorithms and mapped movements to robot kinematics.",
    implementation: [
      "Leap Motion sensor integration",
      "Gesture recognition algorithms",
      "ROS platform integration",
      "Forward/inverse kinematics mapping",
      "Safety protocols and constraints"
    ],
    results: [
      { metric: "98%", description: "gesture accuracy" },
      { metric: "5 DOF", description: "control precision" },
      { metric: "<100ms", description: "latency" },
      { metric: "Safe", description: "operation protocols" }
    ],
    stack: ["ROS", "Leap Motion", "Python", "C++", "Arduino"]
  },
  "air-hockey": {
    title: "Air Hockey SCARA System",
    status: "Completed",
    imageUrl: "/images/air_hockey.jpg",
    problem: "Create autonomous air hockey robot with high-speed vision and precise motion control for entertainment and demonstration.",
    approach: "High-speed camera system with real-time vision processing. Trajectory prediction algorithms and SCARA robot control for puck interception.",
    implementation: [
      "High-speed camera integration",
      "Real-time puck tracking algorithms",
      "Trajectory prediction using physics models",
      "SCARA robot motion planning",
      "Defensive and offensive strategies"
    ],
    results: [
      { metric: "240 FPS", description: "vision processing" },
      { metric: "95%", description: "interception rate" },
      { metric: "<50ms", description: "response time" },
      { metric: "Adaptive", description: "AI strategies" }
    ],
    stack: ["OpenCV", "Python", "Epson SCARA", "Real-time CV"]
  },
  "warehouse-automation": {
    title: "Autonomous Warehouse System",
    status: "Competition",
    imageUrl: "/images/eyantra_dual_robot_arm.gif",
    problem: "Develop multi-robot coordination system for warehouse automation with collision-free operation.",
    approach: "Dual UR5 robot system with MQTT-based coordination. MoveIt motion planning for collision-free paths and real-time communication.",
    implementation: [
      "Dual UR5 robot system in Gazebo simulation",
      "MoveIt motion planning framework",
      "MQTT-based coordination protocol",
      "Google Sheets integration for order tracking",
      "Real-time package delivery monitoring"
    ],
    results: [
      { metric: "Zero", description: "collisions" },
      { metric: "Parallel", description: "task execution" },
      { metric: "Real-time", description: "tracking" },
      { metric: "2", description: "coordinated robots" }
    ],
    stack: ["ROS", "MoveIt", "MQTT", "Python", "Gazebo", "URDF"],
    githubUrl: "https://github.com/TejasPhutane/Eyantra-2021-Vargi-Bots"
  },
  "robot-analytics": {
    title: "Robot Performance Analytics",
    status: "Production",
    imageUrl: "/images/project-placeholder-1.svg",
    problem: "Deployed robotic systems lacked performance visibility. No way to identify bottlenecks or predict throughput, limiting optimization potential and client ROI demonstration.",
    approach: "Built comprehensive analytics framework logging all robot operations and vision detections to PostgreSQL. Developed regression models predicting throughput based on waste characteristics with 91% accuracy.",
    implementation: [
      "PostgreSQL database logging 10,000+ operations daily",
      "Regression models for throughput prediction",
      "Real-time Plotly dashboards for monitoring",
      "pandas for data processing and analysis",
      "scikit-learn for machine learning models",
      "Identified 3 major optimization opportunities"
    ],
    results: [
      { metric: "91%", description: "throughput prediction" },
      { metric: "10,000+", description: "daily operations" },
      { metric: "15%", description: "cycle gain" },
      { metric: "Real-time", description: "dashboard updates" }
    ],
    stack: ["PostgreSQL", "pandas", "scikit-learn", "Plotly", "MQTT", "Jupyter"]
  },
  "ai-quality-control": {
    title: "AI-powered Quality Control System for Manufacturing",
    status: "Production Deployed",
    imageUrl: "/images/project-placeholder-1.svg",
    problem: "Traditional quality control relied on manual inspection, leading to inconsistencies and high defect rates. Needed automated, real-time defect detection to improve product quality and reduce waste.",
    approach: "Developed deep learning-based inspection system using computer vision. Trained CNN models on manufacturing defect datasets with automated data augmentation and deployed on edge devices for real-time processing.",
    implementation: [
      "High-resolution industrial cameras for defect capture",
      "Custom CNN architecture trained on 50,000+ defect samples",
      "Real-time inference on NVIDIA Jetson edge devices",
      "Integration with manufacturing PLC systems",
      "Automated alert system for quality issues"
    ],
    results: [
      { metric: "98.5%", description: "defect detection accuracy" },
      { metric: "0.2 sec", description: 'per inspection' },
      { metric: "75%", description: "defect reduction" },
      { metric: "40%", description: "cost savings" }
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "NVIDIA Jetson", "PLC Integration", "Kafka"]
  },
  "autonomous-warehouse-robot": {
    title: "Autonomous Navigation Robot for Warehouses",
    status: "Production",
    imageUrl: "/images/project-placeholder-2.svg",
    problem: "Warehouse operations faced inefficiencies with manual material handling and navigation challenges. Required autonomous robots for safe, efficient goods transportation in dynamic environments.",
    approach: "Implemented SLAM-based navigation with multi-sensor fusion. Used ROS navigation stack with custom path planning algorithms optimized for warehouse constraints and real-time obstacle avoidance.",
    implementation: [
      "LiDAR and camera-based SLAM for mapping and localization",
      "Multi-sensor fusion (LiDAR, IMU, odometry) for robust navigation",
      "Custom path planning algorithms for warehouse optimization",
      "Real-time obstacle detection and avoidance",
      "Fleet management system for multiple robots"
    ],
    results: [
      { metric: "99.9%", description: "navigation reliability" },
      { metric: "50%", description: "operational efficiency" },
      { metric: "Zero", description: "accidents" },
      { metric: "24/7", description: "operation capability" }
    ],
    stack: ["ROS", "C++", "Python", "LiDAR", "SLAM", "Navigation Stack"]
  },
  "computer-vision-defect": {
    title: "Computer Vision System for Defect Detection",
    status: "In Progress",
    imageUrl: "/images/project-placeholder-1.svg",
    problem: "Surface defect detection in manufacturing required expert inspectors and was prone to human error. Needed automated system to detect micro-defects with high precision and speed.",
    approach: "Built advanced computer vision pipeline using deep learning. Implemented instance segmentation models with attention mechanisms for precise defect localization and classification.",
    implementation: [
      "High-resolution imaging system with controlled lighting",
      "Mask R-CNN based instance segmentation for defect detection",
      "Attention-based neural networks for feature extraction",
      "Automated data pipeline for continuous model improvement",
      "Real-time processing with GPU acceleration"
    ],
    results: [
      { metric: "97.8%", description: "detection precision" },
      { metric: "0.5 sec", description: "processing time" },
      { metric: "85%", description: "false positive reduction" },
      { metric: "50µ", description: "min defect size" }
    ],
    stack: ["PyTorch", "OpenCV", "CUDA", "TensorRT", "DeepStream", "MLflow"]
  },
  "robotic-arm-assembly": {
    title: "Robotic Arm for Assembly Line Automation",
    status: "Production",
    imageUrl: "/images/project-placeholder-2.svg",
    problem: "Manual assembly processes were slow, inconsistent, and ergonomically challenging. Required robotic automation to improve speed, precision, and worker safety in assembly operations.",
    approach: "Integrated 6-DOF robotic arm with vision-guided manipulation. Used force-torque sensing for delicate assembly tasks and developed adaptive control algorithms for varying part tolerances.",
    implementation: [
      "6-DOF robotic arm with force-torque sensor integration",
      "Vision-guided pick-and-place with sub-millimeter precision",
      "Adaptive control algorithms for part variation handling",
      "Safety systems with collision detection and emergency stop",
      "HMI interface for production monitoring and control"
    ],
    results: [
      { metric: "99.5%", description: "assembly accuracy" },
      { metric: "3x", description: "production speed" },
      { metric: "90%", description: "defect reduction" },
      { metric: "Improved", description: "worker ergonomics" }
    ],
    stack: ["ROS", "MoveIt", "Python", "C++", "OpenCV", "Force Sensors"]
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [projects, setProjects] = useState<Record<string, Project>>(projectsData);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle active navigation highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // Offset for header & navigation height
      const sections = ["about", "skills", "experience", "projects", "services", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            window.history.replaceState(null, "", `#${id}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle initial load from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["about", "skills", "experience", "projects", "services", "contact"].includes(hash)) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(hash);
        }, 100);
      }
    }
  }, []);

  // Fetch project images asynchronously via Tavily API (exactly matching legacy app.js)
  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = "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";
      const apiUrl = "https://api.tavily.com/search";

      const customImageProjects = [
        "multi-stream-analytics",
        "valve-inspection",
        "waste-sorting-robot",
        "pepper-robot",
        "da-vinci-robot",
        "air-hockey",
        "warehouse-automation"
      ];

      for (const projectId of Object.keys(projectsData)) {
        if (customImageProjects.includes(projectId)) continue;

        try {
          const project = projectsData[projectId];
          const query = `${project.title} ${project.stack.slice(0, 3).join(" ")} technology project`;

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              query,
              include_images: true,
              max_results: 3
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.images && data.images.length > 0) {
              setProjects(prev => ({
                ...prev,
                [projectId]: {
                  ...prev[projectId],
                  imageUrl: data.images[0].url
                }
              }));
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch image for ${projectId}:`, error);
        }
      }
    };

    fetchImages();
  }, []);

  // Lock scroll when project modal is active
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitStatus("success");
      setSubmitMessage(result.message || "Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setSubmitStatus("error");
      setSubmitMessage(error.message || "Failed to send message. Please try again or contact me directly.");
    }
  };

  // Image load error handler for fallback images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl?: string) => {
    const target = e.currentTarget;
    if (fallbackUrl && target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    } else {
      target.style.display = "none";
      const nextSibling = target.nextElementSibling as HTMLElement;
      if (nextSibling) {
        nextSibling.style.display = "flex";
      }
    }
  };

  return (
    <>
      {/* Fixed Header with Profile */}
      <header className="site-header">
        <div className="header-content">
          <div className="profile-section">
            <img src="/images/profile.png" alt="Tejas Phutane" className="profile-image" />
            <div className="profile-info">
              <h1>Tejas Phutane</h1>
              <p>Senior Robotics Engineer</p>
              <p>Mumbai, India • Open to global opportunities</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="navigation-menu">
        <div className="nav-container">
          {["about", "skills", "experience", "projects", "services", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`nav-link ${activeSection === section ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* About Section */}
        <section id="about" className="content-section">
          <div className="content-container">
            <h2>
              <UserIcon style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>About</span>
            </h2>
            <div className="about-content">
              <p className="about-intro">
                I&apos;m a <strong>Senior Robotics Engineer</strong> at a cutting-edge startup in Gujarat, India, specializing in robotic waste management. With 3+ years of hands-on experience building intelligent autonomous systems, I design production-grade vision systems, real-time perception pipelines, and end-to-end robotic solutions that bridge hardware and software.
              </p>

              <p>
                With a robust background in <strong>Robotics, Control Systems, Simulations, Parallel Processing, Computer Vision, Deep Learning, and IoT</strong>, I strive to pioneer innovative solutions in the realm of robotics. My expertise lies in integrating diverse technologies to enhance efficiency in waste management through intelligent automation.
              </p>

              <p>
                Previously, I led robotics engineering at Wastefull Insights and contributed to <strong>India&apos;s first Robotic Gallery</strong> at Gujarat Science City.
              </p>

              <p>
                I&apos;m passionate about exploring cutting-edge technologies like <strong>digital twins and sim2real transfer</strong> to bridge the gap between simulation and real-world robotics. These technologies are shaping the future of robotics by enabling more efficient development cycles, safer deployment of autonomous systems, and accelerated innovation in intelligent automation.
              </p>

              <div className="about-highlights">
                <div className="highlight-card">
                  <h3>Education</h3>
                  <p>B.E. Electronics & Telecommunication, RGIT Mumbai (2017-2021)</p>
                  <p>CGPA: 7.04</p>
                </div>

                <div className="highlight-card">
                  <h3>Currently</h3>
                  <p>Senior Robotics Engineer at Wastefull Insights</p>
                </div>

                <div className="highlight-card">
                  <h3>Focus Areas</h3>
                  <p>Computer Vision, Motion Planning, ROS/ROS2, Edge AI, Deep Learning, Simulation, Digital Twin</p>
                </div>
              </div>

              <div className="about-highlights">
                <div className="highlight-card">
                  <h3>Key Achievements</h3>
                  <ul>
                    <li>40% speed improvement in motion algorithms</li>
                    <li>94% picking accuracy through sensor fusion</li>
                    <li>80% computational reduction (Python → C++)</li>
                    <li>91% throughput prediction accuracy</li>
                  </ul>
                </div>

                <div className="highlight-card">
                  <h3>Hands-On Experience</h3>
                  <p>Platforms: Pepper, UR10, NAO, Da Vinci, SCARA, Mobile Robots, Quadrupeds</p>
                  <p>Technologies: ROS/ROS2, YOLO, OpenCV, TensorRT, DeepStream</p>
                </div>

                <div className="highlight-card">
                  <h3>Leadership</h3>
                  <p>RGIT Robotics Club Head (2019-2021): Trained 50+ students in robotics workshops and handled deployments for robotics systems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="content-section">
          <div className="content-container">
            <h2>
              <Wrench style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>Technical Skills</span>
            </h2>
            <p className="section-subtitle">Comprehensive toolkit built through production experience</p>

            <div className="skills-grid">
              <div className="skill-category">
                <h3>Robotics & Control</h3>
                <div className="skill-items">
                  {["ROS/ROS2", "MoveIt", "Gazebo", "Motion Planning", "Trajectory Control", "PID Control", "Sensor Fusion", "Kalman Filtering", "SLAM"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className="skill-platforms">Platforms: Pepper, UR10, NAO, Da Vinci, SCARA, Mobile Robots, Quadrupeds</p>
              </div>

              <div className="skill-category">
                <h3>Computer Vision & AI</h3>
                <div className="skill-items">
                  {["YOLO (v3, v5, v8, v11)", "OpenCV", "TensorFlow", "PyTorch", "TensorRT", "DeepStream", "Triton Inference", "Object Detection", "Semantic Segmentation"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h3>Programming</h3>
                <div className="skill-items">
                  {["Python (Expert)", "C++ (Proficient)", "MATLAB", "Linux/UNIX", "CUDA", "Git"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h3>Data & Deployment</h3>
                <div className="skill-items">
                  {["PostgreSQL", "Kafka", "MQTT", "Docker", "Kubernetes", "TimescaleDB", "pandas", "scikit-learn"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h3>Hardware</h3>
                <div className="skill-items">
                  {["NVIDIA Jetson", "Industrial Cameras", "3D LiDAR", "PLC Programming (Omron)", "Arduino", "IMU Sensors"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h3>Leadership & Management</h3>
                <div className="skill-items">
                  {["Team Leadership", "Project Management", "Mentorship", "Event Organization", "Stakeholder Communication", "Cross-functional Collaboration"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="content-section">
          <div className="content-container">
            <h2>
              <Briefcase style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>Experience</span>
            </h2>

            <div className="timeline">
              <div className="timeline-item current-role">
                <div className="timeline-marker">Current</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Senior Robotics Engineer</h3>
                  <p className="timeline-company">Wastefull Insights | Aug 2023 - Present</p>
                  <p className="timeline-description">Leading perception and motion control for autonomous waste sorting robots. Focus on production reliability and performance optimization.</p>

                  <div className="impact-section">
                    <h4>Impact Delivered</h4>
                    <ul className="timeline-achievements">
                      <li><strong>40% speed improvement</strong> by redesigning motion algorithms for 3-axis gantry, reducing inertial losses and improving cycle time precision</li>
                      <li><strong>94% picking accuracy</strong> through multi-modal sensor fusion (camera + Lidar + temporal data via Kafka)</li>
                      <li><strong>80% computational reduction</strong> by refactoring Python to C++ for real-time processing loops</li>
                      <li><strong>91% throughput prediction</strong> using regression models on 10,000+ daily operations for data-driven optimization</li>
                      <li><strong>First production deployment</strong> - managed hardware commissioning, PLC integration, camera triggering, conveyor synchronization</li>
                    </ul>
                  </div>

                  <div className="timeline-tags">
                    {["Python", "C++", "ROS2", "OpenCV", "YOLO", "DeepStream", "Kafka", "PostgreSQL"].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">2021-2022</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Junior Robotics Engineer</h3>
                  <p className="timeline-company">Wastefull Insights | Jan 2021 - Dec 2022</p>
                  <p className="timeline-description">Early development of autonomous waste sorting systems, focusing on computer vision and robot control integration.</p>
                  <ul className="timeline-achievements">
                    <li>Developed initial object detection models for waste classification using OpenCV and YOLO</li>
                    <li>Implemented basic motion planning algorithms for robotic arms</li>
                    <li>Contributed to sensor integration and data collection pipelines</li>
                    <li>Assisted in prototyping autonomous navigation systems</li>
                    <li>Reduced development time by 30% through simulation workflows</li>
                  </ul>
                  <div className="timeline-tags">
                    {["Python", "ROS", "OpenCV", "YOLO", "Gazebo"].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">2021-2022</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Junior Robotics Engineer</h3>
                  <p className="timeline-company">Engineering Services International | Oct 2021 - Sep 2022</p>
                  <p className="timeline-description">Developed exhibits for India&apos;s First Robotics Gallery at Gujarat Science City. Hands-on experience with diverse platforms.</p>
                  <ul className="timeline-achievements">
                    <li>Added face recognition and object detection to Pepper humanoid robot</li>
                    <li>UR10 pick-and-place simulation for RoboCafé project using MoveIt</li>
                    <li>Retrofitted Da Vinci robot with Leap Motion gesture control</li>
                    <li>Built air hockey system with SCARA robot and high-speed vision</li>
                    <li>Reduced development cycles 60% through Gazebo simulation workflow</li>
                  </ul>
                  <div className="timeline-tags">
                    {["ROS", "MoveIt", "Gazebo", "OpenCV", "Arduino"].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">2021</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Computer Vision Intern</h3>
                  <p className="timeline-company">IN2PETA Services | Jun 2021 - Oct 2021</p>
                  <p className="timeline-description">Built autonomous pick-and-place robot with object detection and path planning on NVIDIA Jetson.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="content-section">
          <div className="content-container">
            <h2>
              <Folder style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>Projects</span>
            </h2>
            <p className="section-subtitle">Production systems and technical experiments</p>

            {/* Featured Projects Section */}
            <section className="featured-projects">
              <h3>Featured Projects</h3>
              <div className="projects-grid featured-grid">
                {/* Project 1 */}
                <article className="project-card featured" onClick={() => setActiveProject(projects["multi-stream-analytics"])}>
                  <div className="project-image">
                    <img
                      src={projects["multi-stream-analytics"].imageUrl}
                      alt={projects["multi-stream-analytics"].title}
                      onError={(e) => handleImageError(e)}
                    />
                    <div className="placeholder-image" style={{ display: "none" }}>Project Image</div>
                  </div>
                  <div className="project-content" onClick={(e) => e.stopPropagation()}>
                    <h4>{projects["multi-stream-analytics"].title}</h4>
                    <p>Real-time counting and classification across 4 concurrent camera feeds. Dairy logistics optimization with 99%+ accuracy.</p>

                    <div className="project-metrics">
                      {projects["multi-stream-analytics"].results.slice(0, 3).map((r, i) => (
                        <div className="metric" key={i}>
                          <span className="value">{r.metric}</span>
                          <span className="label">{r.description.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="tech-stack">
                      {projects["multi-stream-analytics"].stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <button className="btn-details" onClick={() => setActiveProject(projects["multi-stream-analytics"])}>
                      View Details
                    </button>
                  </div>
                </article>

                {/* Project 2 */}
                <article className="project-card" onClick={() => setActiveProject(projects["valve-inspection"])}>
                  <div className="project-image">
                    <img
                      src={projects["valve-inspection"].imageUrl}
                      alt={projects["valve-inspection"].title}
                      onError={(e) => handleImageError(e)}
                    />
                    <div className="placeholder-image" style={{ display: "none" }}>Project Image</div>
                  </div>
                  <div className="project-content" onClick={(e) => e.stopPropagation()}>
                    <h4>{projects["valve-inspection"].title}</h4>
                    <p>Automated defect detection for precision manufacturing. ±100 micron tolerance with PLC integration.</p>

                    <div className="project-metrics">
                      {projects["valve-inspection"].results.slice(0, 2).map((r, i) => (
                        <div className="metric" key={i}>
                          <span className="value">{r.metric}</span>
                          <span className="label">{r.description.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="tech-stack">
                      {projects["valve-inspection"].stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <button className="btn-details" onClick={() => setActiveProject(projects["valve-inspection"])}>
                      View Details
                    </button>
                  </div>
                </article>

                {/* Project 3 */}
                <article className="project-card" onClick={() => setActiveProject(projects["waste-sorting-robot"])}>
                  <div className="project-image">
                    <img
                      src={projects["waste-sorting-robot"].imageUrl}
                      alt={projects["waste-sorting-robot"].title}
                      onError={(e) => handleImageError(e, projects["waste-sorting-robot"].fallbackImageUrl)}
                    />
                    <div className="placeholder-image" style={{ display: "none" }}>Project Image</div>
                  </div>
                  <div className="project-content" onClick={(e) => e.stopPropagation()}>
                    <h4>{projects["waste-sorting-robot"].title}</h4>
                    <p>Advanced AI-powered waste sorting solution featuring real-time waste profiling, traceability, and data reporting.</p>

                    <div className="project-metrics">
                      {projects["waste-sorting-robot"].results.slice(0, 3).map((r, i) => (
                        <div className="metric" key={i}>
                          <span className="value">{r.metric}</span>
                          <span className="label">{r.description.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="tech-stack">
                      {projects["waste-sorting-robot"].stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <button className="btn-details" onClick={() => setActiveProject(projects["waste-sorting-robot"])}>
                      View Details
                    </button>
                  </div>
                </article>
              </div>
            </section>

            {/* View All Projects Section */}
            <section className="all-projects" id="all-projects-section" style={{ display: isProjectsExpanded ? "block" : "none" }}>
              <h3>Additional Projects</h3>
              <div className="projects-grid">
                {Object.keys(projects)
                  .filter(key => !["multi-stream-analytics", "valve-inspection", "waste-sorting-robot"].includes(key))
                  .map((key) => {
                    const project = projects[key];
                    return (
                      <article className="project-card" key={key} onClick={() => setActiveProject(project)}>
                        <div className="project-image">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            onError={(e) => handleImageError(e, project.fallbackImageUrl)}
                          />
                          <div className="placeholder-image" style={{ display: "none" }}>Project Image</div>
                        </div>
                        <div className="project-content" onClick={(e) => e.stopPropagation()}>
                          <h4>{project.title}</h4>
                          <p>{project.problem.length > 120 ? `${project.problem.slice(0, 117)}...` : project.problem}</p>
                          {project.githubUrl && (
                            <p>
                              <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                GitHub Repository
                              </a>
                            </p>
                          )}
                          <div className="tech-stack">
                            {project.stack.slice(0, 3).map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                          <button className="btn-details" onClick={() => setActiveProject(project)}>
                            View Details
                          </button>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>

            {/* View All Button */}
            <div className="view-all-container">
              <button
                className="btn-secondary"
                onClick={() => {
                  const newExpanded = !isProjectsExpanded;
                  setIsProjectsExpanded(newExpanded);
                  if (newExpanded) {
                    setTimeout(() => {
                      document.getElementById("all-projects-section")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                      });
                    }, 100);
                  }
                }}
              >
                <span className="btn-text">{isProjectsExpanded ? "Show Less" : "View All Projects"}</span>
                <span className="btn-icon">{isProjectsExpanded ? "↑" : "↓"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="content-section">
          <div className="content-container">
            <h2>
              <Settings style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>Services</span>
            </h2>
            <p className="section-subtitle">Professional consulting and development services</p>

            <div className="services-grid">
              <div className="service-item">
                <Cog size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Robotics Engineering Consulting</h3>
                <p>End-to-end design and development of autonomous robotic systems for industrial applications, including motion planning, control systems, and hardware integration.</p>
              </div>

              <div className="service-item">
                <Eye size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Computer Vision & AI Solutions</h3>
                <p>Custom computer vision systems, object detection, semantic segmentation, and AI/ML deployment on edge devices for real-time applications.</p>
              </div>

              <div className="service-item">
                <Users size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Technical Workshops & Training</h3>
                <p>Hands-on robotics and computer vision workshops for students, professionals, and organizations. Topics include ROS, computer vision, and embedded systems.</p>
              </div>

              <div className="service-item">
                <UserCheck size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Mentorship & Knowledge Sharing</h3>
                <p>One-on-one mentorship for robotics projects, code reviews, and guidance on best practices in autonomous systems development.</p>
              </div>

              <div className="service-item">
                <Mic size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Conference Speaking & Events</h3>
                <p>Technical presentations and speaking engagements at robotics conferences, sharing insights on production-grade vision systems and AI-accelerated development.</p>
              </div>

              <div className="service-item">
                <GithubIcon size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Open-Source Collaboration</h3>
                <p>Collaboration on open-source robotics projects, code contributions, and community-driven initiatives to advance robotics technology.</p>
              </div>

              <div className="service-item">
                <Layers size={24} className="accent-primary" style={{ marginBottom: "1rem" }} />
                <h3>Digital Twin Development</h3>
                <p>Creation of virtual representations of physical systems for simulation, testing, and optimization. Includes sim2real transfer techniques to ensure seamless transition from virtual to real-world deployment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="content-section">
          <div className="content-container">
            <h2>
              <Mail style={{ marginRight: "0.75rem", display: "inline-block", verticalAlign: "middle" }} size={24} className="accent-primary" />
              <span style={{ verticalAlign: "middle" }}>Contact</span>
            </h2>

            <div className="contact-content">
              <p className="contact-intro">
                I&apos;m always excited to connect with fellow engineers, researchers, and innovators. Whether you have questions about robotics, want to discuss potential collaborations, or just want to say hello - I&apos;d love to hear from you!
              </p>

              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-icon">
                    <Mail size={20} className="accent-primary" />
                  </div>
                  <h3>Email</h3>
                  <a href="mailto:tejasphutane.work@gmail.com">tejasphutane.work@gmail.com</a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <Phone size={20} className="accent-primary" />
                  </div>
                  <h3>Phone</h3>
                  <a href="tel:+918484016205">+91-8484016205</a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <LinkedinIcon size={20} className="accent-primary" />
                  </div>
                  <h3>LinkedIn</h3>
                  <a href="https://linkedin.com/in/tejas-phutane" target="_blank" rel="noreferrer">
                    linkedin.com/in/tejas-phutane
                  </a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <GithubIcon size={20} className="accent-primary" />
                  </div>
                  <h3>GitHub</h3>
                  <a href="https://github.com/TejasPhutane" target="_blank" rel="noreferrer">
                    github.com/TejasPhutane
                  </a>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <MapPin size={20} className="accent-primary" />
                  </div>
                  <h3>Location</h3>
                  <span>Mumbai, India</span>
                  <span className="contact-note">Open to global opportunities</span>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container">
                <h3>Send a Message</h3>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" disabled={submitStatus === "sending"}>
                    {submitStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>

                  {/* Form Submission Messages */}
                  {submitStatus === "success" && (
                    <div className="form-message success" style={{ marginTop: "1rem", color: "#4ECDC4" }}>
                      {submitMessage}
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="form-message error" style={{ marginTop: "1rem", color: "#FF6B6B" }}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      {activeProject && (
        <div id="project-modal" className="modal active" tabIndex={-1}>
          <div className="modal-overlay" onClick={() => setActiveProject(null)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setActiveProject(null)}>
              <X size={24} />
            </button>
            <div id="project-detail-content">
              <h2>{activeProject.title}</h2>
              <div
                className={`project-status ${activeProject.status.toLowerCase().replace(" ", "-")}`}
                style={{ display: "inline-block", marginBottom: "1.5rem" }}
              >
                {activeProject.status}
              </div>

              <div style={{ margin: "2rem 0" }}>
                <h3>Problem</h3>
                <p>{activeProject.problem}</p>
              </div>

              <div style={{ margin: "2rem 0" }}>
                <h3>Approach</h3>
                <p>{activeProject.approach}</p>
              </div>

              <div style={{ margin: "2rem 0" }}>
                <h3>Technical Implementation</h3>
                <ul className="timeline-achievements">
                  {activeProject.implementation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ margin: "2rem 0" }}>
                <h3>Results</h3>
                <div className="project-metrics">
                  {activeProject.results.map((r, i) => (
                    <div className="metric" key={i}>
                      <span className="metric-value" style={{ display: "block", fontSize: "2rem", fontWeight: "bold", color: "#00D4FF" }}>
                        {r.metric}
                      </span>
                      <span className="metric-label" style={{ color: "#9AA0A6" }}>{r.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ margin: "2rem 0" }}>
                <h3>Technology Stack</h3>
                <div className="tech-stack">
                  {activeProject.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
