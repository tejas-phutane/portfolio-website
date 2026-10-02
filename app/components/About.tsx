"use client";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Eye, Brain, Layers, Zap, ShieldCheck, Activity, Target } from "lucide-react";

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
                I&apos;m a <strong>Senior Engineer L1</strong> currently at FEV India, actively developing humanoid robotic
                systems on platforms like the <strong>Unitree G1 with Inspire dexterous hands</strong>. With 4+ years of
                hands-on experience, I design physics-accurate sim-to-real transfer workflows, bipedal locomotion policies,
                and robust hardware abstraction/safety layers that bring complex robots reliably into reality.
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
              <p>Unitree G1 Humanoid &amp; Inspire Hand</p>
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

        {/* Delivering Real-World Engineering Value */}
        <ScrollReveal>
          <div className="tenets-section">
            <p className="eyebrow">Engineering Tenets</p>
            <h3>Delivering <span className="gradient-text">Real-World Value</span> vs Conceptual Demos</h3>
            <p className="section-lead">
              Moving robotics from fragile Jupyter notebook prototypes into 24/7 industrial factory deployment requires solving the messy realities of hardware, compute, and physical environments.
            </p>
          </div>
        </ScrollReveal>

        <div className="tenets-grid">
          <ScrollReveal delay={1}>
            <div className="tenet-card">
              <div className="tenet-header">
                <div className="tenet-icon"><Zap size={20} /></div>
                <div>
                  <h4 className="tenet-title">Low-Latency Edge Determinism</h4>
                  <span className="tenet-tagline">C++ / CUDA / TensorRT Engines</span>
                </div>
              </div>
              <p className="tenet-body">
                Research prototypes in Python break down under sub-30ms industrial control cycles. I refactor critical perception bottlenecks to multithreaded C++ and serialize deep learning models into TensorRT FP16/INT8 engines on NVIDIA Jetson Xavier, slashing compute overhead by 80% while concurrently processing 4 RTSP feeds.
              </p>
              <div className="tenet-metric-callout">
                <span>⚡ 80% Compute Overhead Reduced · Sub-50ms Latency</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="tenet-card">
              <div className="tenet-header">
                <div className="tenet-icon"><ShieldCheck size={20} /></div>
                <div>
                  <h4 className="tenet-title">Factory-Floor Ruggedness</h4>
                  <span className="tenet-tagline">24/7 Optical, Thermal &amp; Vibration Robustness</span>
                </div>
              </div>
              <p className="tenet-body">
                True delivery means engineering for dust, camera vibration, and ambient factory lighting swings. I design industrial GigE line-scan vision setups, integrate synchronized strobe lighting, program Omron PLC safety interlocks, and architect watchdog auto-recovery loops ensuring 99.2%+ operational consistency.
              </p>
              <div className="tenet-metric-callout">
                <span>🛡️ 99.2% Detection Accuracy · PLC Safety Handshakes</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="tenet-card">
              <div className="tenet-header">
                <div className="tenet-icon"><Activity size={20} /></div>
                <div>
                  <h4 className="tenet-title">Mechatronic &amp; Motion Optimization</h4>
                  <span className="tenet-tagline">Mathematical Cycle-Time Reduction</span>
                </div>
              </div>
              <p className="tenet-body">
                In production pick-and-place, milliseconds directly dictate facility throughput. By mathematically modeling and refining 3-axis gantry acceleration and S-curve motion profiles, I eliminated inertial losses by 15% and boosted picking cycle speed by 40%, coordinating multi-robot cells sorting 10,000+ items daily.
              </p>
              <div className="tenet-metric-callout">
                <span>⚙️ 40% Cycle Speed Boost · 10,000+ Daily Objects</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={4}>
            <div className="tenet-card">
              <div className="tenet-header">
                <div className="tenet-icon"><Target size={20} /></div>
                <div>
                  <h4 className="tenet-title">Quantified Business ROI</h4>
                  <span className="tenet-tagline">Fleet Telemetry &amp; Predictive Analytics</span>
                </div>
              </div>
              <p className="tenet-body">
                Robotics engineering must produce verifiable economic impact. I built end-to-end telemetry pipelines streaming real-time vision analytics through Kafka and TimescaleDB, training regression models that predict facility throughput with 91% accuracy and slashing manual quality inspection labor by 60%.
              </p>
              <div className="tenet-metric-callout">
                <span>📊 60% Labor Reduction · 91% Prediction Precision</span>
              </div>
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
                <h4>Physical AI &amp; Synthetic Data</h4>
                <p>Exploring simulation environments like Isaac Sim Arena, RoboStudio, GenieSim, and Lightwheel AI (RoboFinals) to generate physics-grounded synthetic data for humanoid policy training.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="exploring-card">
              <div className="exploring-icon"><Eye size={22} /></div>
              <div>
                <h4>Egocentric Data Collection Pipelines</h4>
                <p>Developing first-person multimodal demonstration pipelines (egocentric vision, tactile, proprioception) on platforms like RoboLab for dexterous manipulation and imitation learning.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <div className="exploring-card">
              <div className="exploring-icon"><Brain size={22} /></div>
              <div>
                <h4>Model Training &amp; Validation Layers</h4>
                <p>Engineering closed-loop verification benchmarks and diagnostic safety boundaries to evaluate policy stability before running on physical humanoid hardware.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={4}>
            <div className="exploring-card">
              <div className="exploring-icon"><Layers size={22} /></div>
              <div>
                <h4>G1 &amp; Inspire Hand Dexterity</h4>
                <p>Scaling whole-body coordination on the Unitree G1 bipedal platform with Inspire multi-finger dexterous hands, coupling locomotion policies with compliant manipulation.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
