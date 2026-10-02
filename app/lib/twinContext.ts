/**
 * Digital Twin Knowledge Base & Context Engine for Tejas Phutane
 * Grounded in authentic production robotics, defense aerospace, and humanoid systems experience.
 */

import twinData from '../../content/data/twin.json';

export const TWIN_SYSTEM_PROMPT = twinData.systemPrompt;

export const TWIN_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "record_user_details",
      description: "Record visitor contact details when they want to get in touch, collaborate, or discuss hiring Tejas",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "The visitor's email address",
          },
          name: {
            type: "string",
            description: "The visitor's name or company name, if provided",
          },
          notes: {
            type: "string",
            description: "Context of the inquiry (e.g. job opportunity, consulting project, robotics question)",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "record_unknown_question",
      description: "Record any question that could not be answered from existing knowledge so Tejas can follow up",
      parameters: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The specific question that could not be answered",
          },
        },
        required: ["question"],
        additionalProperties: false,
      },
    },
  },
];
