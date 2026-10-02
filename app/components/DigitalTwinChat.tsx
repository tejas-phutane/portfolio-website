"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2, Sparkles, CheckCircle2, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCall?: string;
  timestamp: string;
}

const STARTER_SUGGESTIONS = [
  "What are you working on with the Unitree G1 Humanoid?",
  "How did you cut compute overhead by 80% with C++?",
  "What exhibits did you commission at Gujarat Science City?",
  "What are you exploring in Physical AI & synthetic data?",
  "Are you available for Senior / Staff robotics roles?",
];

export default function DigitalTwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hi! I'm Tejas's **AI Digital Twin**, grounded in his real hardware deployments, humanoid robotics research, and production vision systems.\n\nAsk me anything about my work on the **Unitree G1**, industrial automation at **Wastefull Insights**, exhibits at the **Robotics Gallery**, or get in touch for collaboration!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [toolToast, setToolToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Map to API payload format
      const payloadMessages = newMessages
        .filter((m) => m.id !== "welcome-1")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      if (data.toolsExecuted?.length) {
        const toolNames = data.toolsExecuted.map((t: any) => t.name).join(", ");
        if (toolNames.includes("record_user_details")) {
          setToolToast("Logged contact details for Tejas's follow-up");
        } else if (toolNames.includes("record_unknown_question")) {
          setToolToast("Recorded question for Tejas to review personally");
        }
        setTimeout(() => setToolToast(null), 4000);
      }

      const assistantMessage: Message = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: data.message || "I'm here to chat about my robotics work. What else would you like to know?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to query Digital Twin:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "I encountered a brief connection glitch with my reasoning backend. Please feel free to retry, or email Tejas directly at **tejasphutane.work@gmail.com**!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat history cleared. What would you like to explore next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render markdown bold, bullet points and linebreaks cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Bold replacer
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="twin-list-item">
            {formattedParts.slice(1)}
          </li>
        );
      }

      return (
        <p key={idx} className="twin-message-paragraph">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="digital-twin-launcher"
        className={`twin-launcher ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Digital Twin Chat"
      >
        <span className="twin-pulse-beacon" />
        <span className="twin-launcher-avatar">
          <Bot size={18} />
        </span>
        <span className="twin-launcher-text">Ask AI Twin</span>
      </button>

      {/* Slide-Over Chat Drawer */}
      <div className={`twin-drawer ${isOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        {/* Drawer Header */}
        <div className="twin-header">
          <div className="twin-header-info">
            <div className="twin-avatar-badge">
              <Bot size={18} />
              <span className="twin-status-dot" />
            </div>
            <div>
              <div className="twin-header-title">
                <span>Tejas Phutane</span>
                <span className="twin-header-pill">AI Twin</span>
              </div>
              <div className="twin-header-sub">
                <span className="twin-online-dot" />
                <span>Hardware & Locomotion Intelligence</span>
              </div>
            </div>
          </div>

          <div className="twin-header-actions">
            <button
              onClick={handleClear}
              className="twin-icon-btn"
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="twin-icon-btn close-btn"
              title="Close chat"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tool Notification Toast */}
        {toolToast && (
          <div className="twin-tool-toast">
            <CheckCircle2 size={14} className="toast-icon" />
            <span>{toolToast}</span>
          </div>
        )}

        {/* Chat Message List */}
        <div className="twin-messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`twin-message-row ${msg.role}`}>
              <div className="twin-message-avatar">
                {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="twin-message-bubble">
                <div className="twin-message-body">
                  {renderFormattedContent(msg.content)}
                </div>
                <div className="twin-message-time">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isLoading && (
            <div className="twin-message-row assistant">
              <div className="twin-message-avatar">
                <Bot size={14} />
              </div>
              <div className="twin-message-bubble thinking">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="thinking-text">Synthesizing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Suggestion Chips (visible when only welcome message is present) */}
        {messages.length <= 1 && (
          <div className="twin-suggestions-tray">
            <div className="suggestions-title">
              <Sparkles size={12} />
              <span>Explore Key Topics:</span>
            </div>
            <div className="suggestions-list">
              {STARTER_SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form
          className="twin-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="twin-input"
            placeholder="Ask about G1 Humanoid, C++ optimizations, or leave contact..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="twin-send-btn"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
