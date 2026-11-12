"use client";
import React from "react";

export default function HumanoidArchitectureDiagram() {
  return (
    <div className="humanoid-arch-diagram" role="region" aria-label="Humanoid Safety and HAL Architecture Diagram">
      <div className="diagram-header">
        <h4>Humanoid Safety and HAL Architecture</h4>
        <span className="diagram-spec-badge">4-Tier Decoupled Pipeline</span>
      </div>

      <div className="diagram-layers-container">
        {/* Layer 1: Autonomy Applications */}
        <div className="diagram-layer layer-autonomy">
          <div className="layer-sidebar">
            <span className="layer-number">Layer 01</span>
            <span className="layer-title">Autonomy Applications</span>
          </div>
          <div className="layer-blocks">
            <div className="arch-block">
              <span className="block-name">LLM Voice Interaction</span>
              <span className="block-detail">Speech recognition, query grounding, dialogue generation</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Waypoint Navigation</span>
              <span className="block-detail">Nav2 multi-station path planning, obstacle avoidance</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Task Execution</span>
              <span className="block-detail">Behavior tree sequence orchestration, visitor state tracking</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Manipulation &amp; Gestures</span>
              <span className="block-detail">Expressive presentation kinematics, coordinated arm poses</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Safety Decision Logic</span>
              <span className="block-detail">Dynamic pause on proximity intrusion, posture recovery</span>
            </div>
          </div>
        </div>

        {/* Transition indicator */}
        <div className="layer-flow-indicator">
          <span>High-Level Action Commands and Goal Requests</span>
        </div>

        {/* Layer 2: Digital Twin and Simulation */}
        <div className="layer-layer-bridge">
          <div className="diagram-layer layer-sim">
            <div className="layer-sidebar">
              <span className="layer-number">Layer 02</span>
              <span className="layer-title">Digital Twin &amp; Simulation</span>
            </div>
            <div className="layer-blocks">
              <div className="arch-block">
                <span className="block-name">Isaac Sim Environment</span>
                <span className="block-detail">Physics-grounded kinematic verification, showroom digital twin</span>
              </div>
              <div className="arch-block">
                <span className="block-name">Collision &amp; Workspace Bounds</span>
                <span className="block-detail">3D spatial sector limits, joint limit violation pre-checks</span>
              </div>
              <div className="arch-block">
                <span className="block-name">Synthetic Data Generation</span>
                <span className="block-detail">Visual and depth sensor simulation, domain-randomized lighting</span>
              </div>
              <div className="arch-block">
                <span className="block-name">Sim-to-Real Parity Check</span>
                <span className="block-detail">Staged verification and trajectory timing validation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transition indicator */}
        <div className="layer-flow-indicator">
          <span>Standardized ROS 2 Control Interfaces and Telemetry Streams</span>
        </div>

        {/* Layer 3: ROS 2 Middleware + HAL */}
        <div className="diagram-layer layer-hal">
          <div className="layer-sidebar">
            <span className="layer-number">Layer 03</span>
            <span className="layer-title">ROS 2 Middleware + HAL</span>
          </div>
          <div className="layer-blocks">
            <div className="arch-block">
              <span className="block-name">ROS 2 Topics &amp; Services</span>
              <span className="block-detail">Standard sensor_msgs, trajectory_msgs, action servers</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Real-Time State Estimation</span>
              <span className="block-detail">Joint encoder aggregation, IMU filtering, live telemetry</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Command Translation</span>
              <span className="block-detail">Joint trajectory interpolation, rate adaptation filters</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Safety Interlocks &amp; Watchdogs</span>
              <span className="block-detail">Heartbeat monitoring, velocity clamps, thermal protection</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Runtime Adapters</span>
              <span className="block-detail">Decoupled hardware-specific communication drivers</span>
            </div>
          </div>
        </div>

        {/* Transition indicator */}
        <div className="layer-flow-indicator">
          <span>Hardware Bus Communication (CAN / Ethernet / Low-Level IPC)</span>
        </div>

        {/* Layer 4: Robot Backends */}
        <div className="diagram-layer layer-backends">
          <div className="layer-sidebar">
            <span className="layer-number">Layer 04</span>
            <span className="layer-title">Robot Backends</span>
          </div>
          <div className="layer-blocks">
            <div className="arch-block highlight-backend">
              <span className="block-name">Unitree G1 Humanoid Platform</span>
              <span className="block-detail">Target biped hardware, low-level joint actuators, onboard sensors</span>
            </div>
            <div className="arch-block">
              <span className="block-name">Compatible ROS 2 Robotics Platforms</span>
              <span className="block-detail">Swappable manipulators, mobile bases, and experimental hardware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}