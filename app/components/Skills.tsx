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

export default function Skills() {
  const [activeTierId, setActiveTierId] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<number>(0);

  const activeTier = SUBSYSTEM_TIERS.find((t) => t.id === activeTierId);

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

        {/* Dual-Panel Command Station: Exploded Subsystem Blueprint + Layered Architecture Stack */}
        <div className="arsenal-command-station">
          {/* Left Panel: Exploded Robotic Subsystem Blueprint */}
          <div className="blueprint-panel">
            <div className="blueprint-header">
              <div className="blueprint-status">
                <span className="blueprint-indicator" />
                <span className="blueprint-sys-id">Humanoid Subsystem Architecture</span>
              </div>
              <span className="blueprint-mode-tag">Interactive Explorer</span>
            </div>

            {/* Exploded Humanoid Wireframe Blueprint SVG */}
            <div className="blueprint-viewport">
              <svg
                viewBox="0 0 460 520"
                className="blueprint-svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Exploded Humanoid Subsystem Architecture Blueprint"
              >
                <defs>
                  <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Blueprint Background Grid */}
                <rect width="460" height="520" fill="#080c14" />
                <rect width="460" height="520" fill="url(#blueprintGrid)" />

                {/* Technical Corner Brackets */}
                <path d="M 12 28 L 12 12 L 28 12" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 448 28 L 448 12 L 432 12" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 12 492 L 12 508 L 28 508" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 448 492 L 448 508 L 432 508" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.7" />

                {/* Central Datum Axis Line */}
                <line x1="230" y1="20" x2="230" y2="500" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                {/* ─── Exploded Module 05: Policy & Vision Head Pod ─── */}
                <g
                  className={`blueprint-group ${activeTierId === "physical-ai" ? "active" : ""}`}
                  onMouseEnter={() => setActiveTierId("physical-ai")}
                  onClick={() => setActiveTierId(activeTierId === "physical-ai" ? null : "physical-ai")}
                  tabIndex={0}
                  role="button"
                  aria-label="Head Sensor and Policy Module"
                >
                  {/* Vision sensor cone */}
                  <polygon points="230,55 170,18 290,18" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Head Chassis */}
                  <rect x="200" y="55" width="60" height="42" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* Stereo camera lens indicators */}
                  <circle cx="216" cy="74" r="5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="244" cy="74" r="5" fill="#f59e0b" opacity="0.8" />
                  <line x1="222" y1="84" x2="238" y2="84" stroke="#94a3b8" strokeWidth="1" />
                  {/* Callout Line & Tag */}
                  <path d="M 260 74 L 330 74 L 350 54" stroke="#f59e0b" strokeWidth="1.2" fill="none" />
                  <circle cx="350" cy="54" r="3" fill="#f59e0b" />
                  <text x="358" y="50" fill="#f59e0b" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">05 // VISUOMOTOR HEAD</text>
                  <text x="358" y="63" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8.5">RGB-D · Egocentric Teleop</text>
                </g>

                {/* Exploded Neck Separation Datum */}
                <line x1="210" y1="106" x2="250" y2="106" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />

                {/* ─── Exploded Module 04 / 02: Torso Compute & HAL Core ─── */}
                <g
                  className={`blueprint-group ${activeTierId === "middleware" ? "active" : ""}`}
                  onMouseEnter={() => setActiveTierId("middleware")}
                  onClick={() => setActiveTierId(activeTierId === "middleware" ? null : "middleware")}
                  tabIndex={0}
                  role="button"
                  aria-label="Torso Compute and Real-time Core"
                >
                  <rect x="185" y="116" width="90" height="95" rx="8" fill="#0d1424" stroke="#10b981" strokeWidth="1.5" />
                  {/* Jetson Compute Carrier Box */}
                  <rect x="198" y="130" width="64" height="42" rx="4" fill="#060911" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                  <text x="230" y="148" textAnchor="middle" fill="#10b981" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">JETSON AGX</text>
                  <text x="230" y="160" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="7.5">1kHz RT-HAL</text>
                  {/* Heatsink fin slats */}
                  <line x1="202" y1="182" x2="258" y2="182" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                  <line x1="202" y1="188" x2="258" y2="188" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                  <line x1="202" y1="194" x2="258" y2="194" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                  {/* Callout Line & Tag */}
                  <path d="M 185 155 L 115 155 L 95 135" stroke="#10b981" strokeWidth="1.2" fill="none" />
                  <circle cx="95" cy="135" r="3" fill="#10b981" />
                  <text x="90" y="130" textAnchor="end" fill="#10b981" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">02 // RT-HAL &amp; SAFETY</text>
                  <text x="90" y="143" textAnchor="end" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8.5">C++20 · Watchdogs · CAN</text>
                </g>

                {/* ─── Exploded Module 03: Perception & Edge Vision Engine ─── */}
                <g
                  className={`blueprint-group ${activeTierId === "perception" ? "active" : ""}`}
                  onMouseEnter={() => setActiveTierId("perception")}
                  onClick={() => setActiveTierId(activeTierId === "perception" ? null : "perception")}
                  tabIndex={0}
                  role="button"
                  aria-label="Perception and DeepStream Engine"
                >
                  {/* Shoulder Vision Turret / Collar */}
                  <path d="M 160 120 L 185 120 L 185 136 L 160 136 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.2" />
                  <path d="M 275 120 L 300 120 L 300 136 L 275 136 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.2" />
                  <circle cx="172" cy="128" r="3" fill="#a855f7" />
                  <circle cx="288" cy="128" r="3" fill="#a855f7" />
                  {/* Callout Line & Tag */}
                  <path d="M 300 128 L 350 128 L 370 148" stroke="#a855f7" strokeWidth="1.2" fill="none" />
                  <circle cx="370" cy="148" r="3" fill="#a855f7" />
                  <text x="378" y="146" fill="#a855f7" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">03 // VISION &amp; TENSORRT</text>
                  <text x="378" y="159" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8.5">DeepStream · Zero-Copy</text>
                </g>

                {/* ─── Exploded Module 01: Arms & Dexterous Manipulation Hands ─── */}
                <g
                  className={`blueprint-group ${activeTierId === "hardware" ? "active" : ""}`}
                  onMouseEnter={() => setActiveTierId("hardware")}
                  onClick={() => setActiveTierId(activeTierId === "hardware" ? null : "hardware")}
                  tabIndex={0}
                  role="button"
                  aria-label="Dexterous Hand and Arm Actuation"
                >
                  {/* Left Arm Assembly */}
                  <path d="M 160 135 L 140 185 L 128 235" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
                  <circle cx="140" cy="185" r="5" fill="#080c14" stroke="#f97316" strokeWidth="1.5" />
                  {/* Left Hand: Multi-Finger Stylization */}
                  <rect x="114" y="235" width="22" height="26" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1.2" />
                  <line x1="119" y1="261" x2="119" y2="272" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="125" y1="261" x2="125" y2="274" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="131" y1="261" x2="131" y2="272" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Right Arm Assembly */}
                  <path d="M 300 135 L 320 185 L 332 235" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
                  <circle cx="320" cy="185" r="5" fill="#080c14" stroke="#f97316" strokeWidth="1.5" />
                  {/* Right Hand */}
                  <rect x="324" y="235" width="22" height="26" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1.2" />
                  <line x1="329" y1="261" x2="329" y2="272" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="335" y1="261" x2="335" y2="274" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="341" y1="261" x2="341" y2="272" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Callout Line & Tag */}
                  <path d="M 114 250 L 60 250 L 40 230" stroke="#f97316" strokeWidth="1.2" fill="none" />
                  <circle cx="40" cy="230" r="3" fill="#f97316" />
                  <text x="35" y="226" textAnchor="end" fill="#f97316" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">01 // DEXTEROUS HANDS</text>
                  <text x="35" y="239" textAnchor="end" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8.5">Inspire 6-Finger · Tactile</text>
                </g>

                {/* Exploded Waist Separation Datum */}
                <line x1="200" y1="222" x2="260" y2="222" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />

                {/* ─── Exploded Module 04 / 01: Bipedal Pelvis & 23-DOF Actuators ─── */}
                <g
                  className={`blueprint-group ${activeTierId === "simulation" ? "active" : ""}`}
                  onMouseEnter={() => setActiveTierId("simulation")}
                  onClick={() => setActiveTierId(activeTierId === "simulation" ? null : "simulation")}
                  tabIndex={0}
                  role="button"
                  aria-label="Simulation and Bipedal Kinematic Chain"
                >
                  {/* Pelvis Box */}
                  <polygon points="195,228 265,228 250,265 210,265" fill="#0c1829" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="230" cy="245" r="7" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="230" cy="245" r="3" fill="#38bdf8" />

                  {/* Left Leg Kinematic Strut */}
                  <path d="M 210 265 L 195 350 L 190 445" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <circle cx="195" cy="350" r="6" fill="#080c14" stroke="#38bdf8" strokeWidth="1.8" />
                  {/* Left Foot */}
                  <rect x="175" y="445" width="34" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

                  {/* Right Leg Kinematic Strut */}
                  <path d="M 250 265 L 265 350 L 270 445" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <circle cx="265" cy="350" r="6" fill="#080c14" stroke="#38bdf8" strokeWidth="1.8" />
                  {/* Right Foot */}
                  <rect x="252" y="445" width="34" height="12" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

                  {/* Callout Line & Tag */}
                  <path d="M 270 350 L 335 350 L 355 330" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
                  <circle cx="355" cy="330" r="3" fill="#38bdf8" />
                  <text x="362" y="326" fill="#38bdf8" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">04 // SIM-TO-REAL BIPED</text>
                  <text x="362" y="339" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8.5">23-DOF · Isaac Sim 4.0 PhysX</text>
                </g>

                {/* Ground Contact Plane */}
                <line x1="140" y1="465" x2="320" y2="465" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" strokeDasharray="4 3" />
                <text x="230" y="482" textAnchor="middle" fill="#94a3b8" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1">
                  GROUND CONTACT &amp; DYNAMICS DATUM
                </text>
              </svg>

              <div className="blueprint-legend">
                <span className="legend-label">Hover or select subsystems to inspect architecture tiers</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Layered Architectural Chassis Stack */}
          <div className="arsenal-stack-panel">
            <div className="stack-panel-header">
              <span className="stack-panel-eyebrow">SYSTEM TIERS (POLICIES → HARDWARE)</span>
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
                    onMouseEnter={() => setActiveTierId(tier.id)}
                    onClick={() => setActiveTierId(isSelected ? null : tier.id)}
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
