"use client";
import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import {
  Brain,
  Layers,
  Eye,
  Cpu,
  Shield,
  Activity,
  Boxes,
  Network,
  Zap,
  Radio,
  Sliders,
  CheckCircle2,
  Terminal,
  Workflow
} from "lucide-react";

interface SubsystemTier {
  id: string;
  tierNumber: string;
  category: string;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  summary: string;
  skills: string[];
  specs: string;
}

const SUBSYSTEM_TIERS: SubsystemTier[] = [
  {
    id: "physical-ai",
    tierNumber: "05",
    category: "EMBODIED INTELLIGENCE",
    title: "Physical AI & Policy Learning",
    icon: <Brain size={20} />,
    accentColor: "#f59e0b",
    summary: "Imitation learning, behavioral cloning, and multimodal demonstration pipelines for dexterous manipulation.",
    skills: ["ACT (Action Chunking)", "SmolVLA", "Behavioral Cloning", "PyTorch", "HuggingFace LeRobot", "Egocentric Vision Data", "Multimodal Teleop", "SO100 Calibration"],
    specs: "Inference: Closed-loop policy execution · Training: Diffusion & transformer architectures",
  },
  {
    id: "simulation",
    tierNumber: "04",
    category: "PHYSICS & TWINS",
    title: "Simulation & Digital Twins",
    icon: <Boxes size={20} />,
    accentColor: "#38bdf8",
    summary: "High-fidelity digital twin environments with domain-randomized physics and kinematic envelope checks.",
    skills: ["NVIDIA Isaac Sim 4.0", "Isaac Lab 3.0", "MuJoCo", "MJLab", "RoboSuite", "Genesis", "RoboMimic", "Gazebo", "URDF/Xacro"],
    specs: "Simulation engine: PhysX 5 GPU-accelerated · Loop rate: 60Hz physics · Synthetic RGB-D generation",
  },
  {
    id: "perception",
    tierNumber: "03",
    category: "EDGE PERCEPTION",
    title: "Vision & Edge AI Acceleration",
    icon: <Eye size={20} />,
    accentColor: "#a855f7",
    summary: "Zero-copy hardware video decoding and high-throughput TensorRT neural acceleration on edge platforms.",
    skills: ["TensorRT FP16/INT8", "NVIDIA DeepStream SDK", "YOLO (v3-v11)", "OpenCV", "Triton Inference Server", "Semantic Segmentation", "Anomalib", "CUDA Acceleration"],
    specs: "Latency: Sub-45ms multi-stream inference · Memory: Zero-copy NVMM buffers across 4 RTSP feeds",
  },
  {
    id: "middleware",
    tierNumber: "02",
    category: "CORE RUNTIME",
    title: "Real-Time Middleware, HAL & Safety",
    icon: <Network size={20} />,
    accentColor: "#10b981",
    summary: "Deterministic hardware abstraction layers, kinematic collision envelopes, and watchdog safety interlocks.",
    skills: ["ROS 2 (Humble/Iron)", "C++20 (Multithreaded)", "MoveIt 2", "Nav2 Waypoints", "Deterministic E-Stop State Machine", "CAN Bus / SocketCAN", "Omron PLC Handshakes", "RT-Preempt Linux"],
    specs: "Telemetry: 1kHz joint watchdog heartbeat · Control: Jerk-limited S-curves & velocity clamps",
  },
  {
    id: "hardware",
    tierNumber: "01",
    category: "TARGET PLATFORMS",
    title: "Silicon, Robotics Platforms & Hardware",
    icon: <Cpu size={20} />,
    accentColor: "#f97316",
    summary: "Direct hardware commissioning across humanoid bipeds, dexterous hands, industrial arms, and edge compute.",
    skills: ["Unitree G1 Biped", "Inspire Multi-Finger Hand", "NVIDIA Jetson AGX Xavier", "GigE Industrial Cameras", "3D LiDAR", "Pepper Humanoid", "UR10 Arm", "Da Vinci Console", "SCARA Cells"],
    specs: "Actuation: 23-DOF humanoid kinematics · Sensors: Synchronized strobe vision, IMUs & force sensors",
  },
];

interface BusStation {
  step: string;
  name: string;
  phase: string;
  engine: string;
  spec: string;
  role: string;
  verificationBadge: string;
}

const BUS_STATIONS: BusStation[] = [
  {
    step: "01",
    name: "Synthetic Physics",
    phase: "SIMULATION GATEWAY",
    engine: "Isaac Sim 4.0 / MuJoCo",
    spec: "60Hz GPU PhysX · Domain Randomization",
    role: "Digital-twin kinematics verification, workspace collision bounds, and synthetic RGB-D generation before touching hardware.",
    verificationBadge: "Zero-Risk Virtual Bringup",
  },
  {
    step: "02",
    name: "Perception Kernel",
    phase: "EDGE ACCELERATION",
    engine: "DeepStream + TensorRT FP16",
    spec: "Sub-45ms Latency · Zero-Copy NVMM",
    role: "Hardware-accelerated zero-copy video decoding from multiple RTSP streams feeding quantized neural engines.",
    verificationBadge: "80% Compute Overhead Reduced",
  },
  {
    step: "03",
    name: "Trajectory Planning",
    phase: "KINEMATIC DYNAMICS",
    engine: "MoveIt 2 + Nav2 + S-Curves",
    spec: "Jerk-Limited Acceleration · Nav2 Stations",
    role: "Dynamic obstacle avoidance and multi-station autonomous path generation with continuous jerk minimization.",
    verificationBadge: "40% Picking Speed Boost",
  },
  {
    step: "04",
    name: "Safety Envelopes & HAL",
    phase: "DETERMINISTIC INTERLOCKS",
    engine: "ROS 2 C++ HAL + Omron PLC",
    spec: "1kHz Watchdog Heartbeat · Torque Clamps",
    role: "Real-time state estimation, velocity ceilings, self-collision envelopes, and hardware fault diagnostic checks.",
    verificationBadge: "100% Hardware Protection",
  },
  {
    step: "05",
    name: "Physical Deployment",
    phase: "FLEET TELEMETRY",
    engine: "Unitree G1 / Industrial Cells",
    spec: "CAN/Ethernet Bus · Kafka + TimescaleDB",
    role: "Physical robot execution, live machine telemetry streaming, and automated anomaly alert logging on factory floors.",
    verificationBadge: "99.2% Operational Consistency",
  },
];

interface G1HardwarePart {
  id: string;
  name: string;
  partNumber: string;
  tabLabel: string;
  tierId: string;
  badge: string;
  subTitle: string;
  macroImage: string;
  hotspot: { top: string; left: string };
  specs: { label: string; value: string }[];
  components: string[];
  software: string[];
  description: string;
}

const G1_PARTS: G1HardwarePart[] = [
  {
    id: "head-pod",
    name: "Visuomotor Perception Pod",
    partNumber: "01",
    tabLabel: "01 Vision",
    tierId: "perception",
    badge: "3D LIDAR + RGB-D",
    subTitle: "Livox Mid-360 LiDAR & Intel RealSense D435i",
    macroImage: "/images/g1-parts/g1-head-pod.png",
    hotspot: { top: "20%", left: "51%" },
    specs: [
      { label: "LiDAR FOV", value: "360 deg Omnidirectional, 40m range" },
      { label: "Stereo Depth", value: "Intel RealSense D435i @ 60 FPS" },
      { label: "Audio Sensor", value: "8-Channel Far-Field Microphone Array" },
      { label: "Pipeline", value: "Sub-45ms RTSP Streaming to Jetson" },
    ],
    components: ["Livox Mid-360 3D LiDAR", "Intel RealSense D435i Depth Camera", "Array Microphone", "Low-Latency NVMM Encoder"],
    software: ["TensorRT FP16/INT8", "NVIDIA DeepStream", "YOLOv11 Detection", "Spatial SLAM"],
    description: "Frontal sensory array integrating 360-degree LiDAR and stereoscopic RGB-D depth vision for spatial mapping, obstacle avoidance, and egocentric teleoperation.",
  },
  {
    id: "torso-carrier",
    name: "Torso Compute & Power Core",
    partNumber: "02",
    tabLabel: "02 Compute",
    tierId: "middleware",
    badge: "275 TOPS SILICON",
    subTitle: "NVIDIA Jetson AGX Silicon & Dual CAN-FD Buses",
    macroImage: "/images/g1-parts/g1-torso-carrier.png",
    hotspot: { top: "37%", left: "51%" },
    specs: [
      { label: "Edge Silicon", value: "NVIDIA Jetson AGX Orin (275 TOPS)" },
      { label: "Bus Protocol", value: "Dual Isolated High-Speed CAN-FD" },
      { label: "Battery Unit", value: "Quick-Release 9000mAh Lithium Pack" },
      { label: "Watchdog", value: "1kHz Real-Time Deterministic E-Stop" },
    ],
    components: ["NVIDIA Jetson AGX Silicon Carrier", "Isolated CAN-FD Transceivers", "Power Conditioning Hub", "1kHz Hardware Watchdog"],
    software: ["ROS 2 Humble / Iron", "C++20 RT-Preempt", "MoveIt 2", "Deterministic Safety State Machine"],
    description: "Central processing core coordinating real-time motor actuation, kinematic boundary clamps, zero-copy neural acceleration, and hardware interlocks.",
  },
  {
    id: "dexterous-hand",
    name: "5-Finger Dexterous Tactile Hand",
    partNumber: "03",
    tabLabel: "03 Hands",
    tierId: "physical-ai",
    badge: "TACTILE MANIPULATION",
    subTitle: "Inspire 5-Finger Hand with Tactile Array",
    macroImage: "/images/g1-parts/g1-dexterous-hand.png",
    hotspot: { top: "56%", left: "41%" },
    specs: [
      { label: "Degrees of Freedom", value: "5 Active Multi-Joint Fingers" },
      { label: "Sensing", value: "Fingertip Pressure Matrix & Torque" },
      { label: "Control", value: "Hybrid Current/Position Trajectories" },
      { label: "Continuous Payload", value: "Up to 2.0 kg per End-Effector" },
    ],
    components: ["Micro-DC Precision Servos", "Fingertip Pressure Matrix", "Tendon Wire Couplers", "Quick-Release Wrist Collar"],
    software: ["SmolVLA / ACT Policy Learning", "HuggingFace LeRobot", "Egocentric Teleoperation", "Bimanual Trajectories"],
    description: "High-dexterity robotic hand for fine manipulation, contact-rich insertion, and imitation learning workflows driven by multimodal demonstration data.",
  },
  {
    id: "leg-actuator",
    name: "23-DOF Bipedal Leg Actuators",
    partNumber: "04",
    tabLabel: "04 Legs",
    tierId: "simulation",
    badge: "HIGH-TORQUE PLANETARY",
    subTitle: "Dynamic Planetary Gearbox Joint Actuators",
    macroImage: "/images/g1-parts/g1-leg-actuator.png",
    hotspot: { top: "76%", left: "48%" },
    specs: [
      { label: "Kinematic DOF", value: "23 to 43 Degrees of Freedom" },
      { label: "Peak Joint Torque", value: "Up to 120 N.m Planetary Units" },
      { label: "Sim-to-Real Engine", value: "Isaac Sim 4.0 PhysX 5 & MuJoCo" },
      { label: "Dynamic Speed", value: "Up to 2.0 m/s Locomotion Velocity" },
    ],
    components: ["Planetary Gearbox Actuators", "Absolute Optical Encoders", "Carbon-Fiber Leg Spars", "Dual-Axis Contact Feet"],
    software: ["Isaac Lab 3.0", "MuJoCo Dynamics", "Whole-Body Model Predictive Control", "Domain Randomization"],
    description: "High-torque, high-bandwidth planetary actuators providing rugged compliance and dynamic balance for simulated-to-real bipedal locomotion policies.",
  },
];

export default function Skills() {
  const [activeTierId, setActiveTierId] = useState<string | null>(null);
  const [activePartId, setActivePartId] = useState<string>("head-pod");
  const [selectedStation, setSelectedStation] = useState<number>(0);

  const activeTier = SUBSYSTEM_TIERS.find((t) => t.id === activeTierId);
  const activePart = G1_PARTS.find((p) => p.id === activePartId) || G1_PARTS[0];

  const handleSelectPart = (partId: string) => {
    setActivePartId(partId);
    const part = G1_PARTS.find((p) => p.id === partId);
    if (part) {
      setActiveTierId(part.tierId);
    }
  };

  const handleTierHover = (tierId: string | null) => {
    setActiveTierId(tierId);
    if (tierId) {
      const matchingPart = G1_PARTS.find((p) => p.tierId === tierId);
      if (matchingPart) {
        setActivePartId(matchingPart.id);
      }
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-eyebrow">Systems Architecture</span>
            <h2 className="section-title">Robotics Stack &amp; Systems Architecture</h2>
            <p className="section-subtitle">
              Decoupled hardware-to-policy software stack engineered across 4+ years of industrial automation and humanoid robotics.
            </p>
          </div>
        </ScrollReveal>

        {/* Dual-Panel Command Station: Unitree G1 Hardware Explorer + Layered Architecture Stack */}
        <div className="arsenal-command-station">
          {/* Left Panel: Unitree G1 Humanoid Hardware Explorer */}
          <div className="hardware-explorer-panel">
            <div className="hardware-explorer-header">
              <div className="hardware-status">
                <span className="hardware-indicator" />
                <span className="hardware-sys-id">Unitree G1 Humanoid Hardware Explorer</span>
              </div>
              <span className="hardware-mode-tag">Interactive Architecture</span>
            </div>

            {/* Sub-Assembly Tab Buttons */}
            <div className="subassembly-tabs-bar" role="tablist" aria-label="Unitree G1 Sub-assemblies">
              {G1_PARTS.map((part) => (
                <button
                  key={part.id}
                  className={`subassembly-tab-btn ${activePartId === part.id ? "active" : ""}`}
                  onClick={() => handleSelectPart(part.id)}
                  role="tab"
                  aria-selected={activePartId === part.id}
                >
                  <span className="subassembly-tab-name">{part.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Interactive Robot Chassis Stage */}
            <div className="robot-chassis-stage">
              <div className="robot-chassis-viewport">
                <img
                  src="/images/g1-parts/g1-full-robot.jpg"
                  alt="Unitree G1 Humanoid Robot Hardware Platform"
                  className="robot-chassis-img"
                  loading="lazy"
                />

                {/* Hotspot Radar Pins */}
                {G1_PARTS.map((part) => {
                  const isSelected = activePartId === part.id;
                  return (
                    <button
                      key={part.id}
                      className={`hardware-hotspot ${isSelected ? "active" : ""}`}
                      style={{ top: part.hotspot.top, left: part.hotspot.left }}
                      onClick={() => handleSelectPart(part.id)}
                      onMouseEnter={() => handleSelectPart(part.id)}
                      aria-label={`Inspect ${part.name}`}
                      title={part.name}
                    >
                      <span className="hotspot-pulse" />
                      <span className="hotspot-core">{part.partNumber}</span>
                      <span className="hotspot-tooltip">{part.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="chassis-stage-footer">
                <span className="chassis-stage-hint">
                  Click or hover any hotspot pin to inspect sub-assembly telemetry
                </span>
              </div>
            </div>

            {/* Sub-Assembly Macro Telemetry Drawer */}
            <div className="subassembly-macro-drawer">
              <div className="macro-drawer-header">
                <div className="macro-img-wrap">
                  <img
                    src={activePart.macroImage}
                    alt={activePart.name}
                    className="macro-part-thumb"
                  />
                </div>
                <div className="macro-meta-wrap">
                  <div className="macro-badge-row">
                    <span className="macro-part-num">PART {activePart.partNumber}</span>
                    <span className="macro-part-badge">{activePart.badge}</span>
                  </div>
                  <h3 className="macro-part-title">{activePart.name}</h3>
                  <p className="macro-part-sub">{activePart.subTitle}</p>
                </div>
              </div>

              <p className="macro-part-desc">{activePart.description}</p>

              {/* Physical Specifications Grid */}
              <div className="macro-specs-grid">
                {activePart.specs.map((spec, i) => (
                  <div key={i} className="macro-spec-item">
                    <span className="macro-spec-label">{spec.label}</span>
                    <span className="macro-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Integrated Components and Software Tags */}
              <div className="macro-tags-section">
                <div className="macro-tags-group">
                  <span className="macro-tags-label">HARDWARE MODULES:</span>
                  <div className="macro-pills-row">
                    {activePart.components.map((comp) => (
                      <span key={comp} className="macro-hardware-pill">{comp}</span>
                    ))}
                  </div>
                </div>

                <div className="macro-tags-group">
                  <span className="macro-tags-label">LINKED SOFTWARE &amp; POLICIES:</span>
                  <div className="macro-pills-row">
                    {activePart.software.map((sw) => (
                      <span key={sw} className="macro-software-pill">{sw}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Layered Architectural Chassis Stack */}
          <div className="arsenal-stack-panel">
            <div className="stack-panel-header">
              <span className="stack-panel-eyebrow">SYSTEM TIERS (POLICIES TO HARDWARE)</span>
              {activeTier ? (
                <span className="active-tier-pill" style={{ borderColor: activeTier.accentColor, color: activeTier.accentColor }}>
                  FOCUSED: TIER {activeTier.tierNumber} · {activeTier.title}
                </span>
              ) : (
                <span className="active-tier-pill default">
                  ALL 5 SYSTEM TIERS ACTIVE
                </span>
              )}
            </div>

            <div className="subsystem-layers-list">
              {SUBSYSTEM_TIERS.map((tier) => {
                const isSelected = activeTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`subsystem-tier-row ${isSelected ? "selected-tier" : ""}`}
                    style={{ borderLeftColor: tier.accentColor }}
                    onMouseEnter={() => handleTierHover(tier.id)}
                    onClick={() => handleTierHover(isSelected ? null : tier.id)}
                  >
                    <div className="tier-meta-bar">
                      <div className="tier-id-group">
                        <span className="tier-number" style={{ color: tier.accentColor }}>TIER {tier.tierNumber}</span>
                        <span className="tier-category">{tier.category}</span>
                      </div>
                      <span className="tier-spec-chip">{tier.specs}</span>
                    </div>

                    <div className="tier-title-row">
                      <div className="tier-icon" style={{ color: tier.accentColor, background: `${tier.accentColor}18` }}>
                        {tier.icon}
                      </div>
                      <h3 className="tier-heading">{tier.title}</h3>
                    </div>

                    <p className="tier-summary">{tier.summary}</p>

                    <div className="tier-skills-wrap">
                      {tier.skills.map((skill) => (
                        <span key={skill} className="tier-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Simulation-to-Production Pipeline ─── */}
        <div className="pipeline-bus-section">
          <ScrollReveal>
            <div className="pipeline-bus-header">
              <span className="section-eyebrow">Deployment Workflow</span>
              <h3 className="pipeline-bus-title">
                Simulation-to-Production Pipeline
              </h3>
              <p className="pipeline-bus-sub">
                Hardware-in-the-loop validation tracing signals from synthetic physics through edge perception to real-time physical control.
              </p>
            </div>
          </ScrollReveal>

          {/* Continuous PCB / Data Bus Rail */}
          <div className="signal-bus-rail">
            {/* The uninterrupted glowing bus track line */}
            <div className="bus-highway-track">
              <div className="bus-highway-line" />
              <div className="bus-packet-pulse" />
            </div>

            {/* The 5 Stations Along the Highway */}
            <div className="bus-stations-container">
              {BUS_STATIONS.map((station, idx) => {
                const isCurrent = selectedStation === idx;
                return (
                  <div
                    key={station.step}
                    className={`bus-station-node ${isCurrent ? "active-station" : ""}`}
                    onClick={() => setSelectedStation(idx)}
                    onMouseEnter={() => setSelectedStation(idx)}
                  >
                    {/* Node Dot with pulse ring */}
                    <div className="station-node-dot">
                      <span className="station-step-label">{station.step}</span>
                    </div>

                    <div className="station-content-box">
                      <span className="station-phase-tag">{station.phase}</span>
                      <h4 className="station-name">{station.name}</h4>
                      <span className="station-engine-label">{station.engine}</span>
                      <div className="station-spec-row">
                        <span>{station.spec}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Station Verification Telemetry Drawer */}
          <div className="station-verification-drawer">
            <div className="drawer-header-row">
              <div className="drawer-step-badge">
                <span className="badge-dot" />
                <span>Station {BUS_STATIONS[selectedStation].step}: {BUS_STATIONS[selectedStation].name} · Verification Details</span>
              </div>
              <span className="drawer-metric-pill">
                {BUS_STATIONS[selectedStation].verificationBadge}
              </span>
            </div>

            <div className="drawer-body-grid">
              <div className="drawer-col">
                <span className="drawer-col-label">PRIMARY COMPUTATIONAL ENGINE</span>
                <p className="drawer-col-val">{BUS_STATIONS[selectedStation].engine}</p>
                <span className="drawer-col-sub">{BUS_STATIONS[selectedStation].spec}</span>
              </div>
              <div className="drawer-col flex-2">
                <span className="drawer-col-label">ENGINEERING ROLE &amp; SAFETY BOUNDARY</span>
                <p className="drawer-col-desc">{BUS_STATIONS[selectedStation].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
