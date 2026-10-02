import { NextRequest, NextResponse } from 'next/server';
import { TWIN_SYSTEM_PROMPT, TWIN_TOOLS } from '../../lib/twinContext';
import { executeTool } from '../../lib/twinTools';
import { SITE_CONFIG } from '../../lib/config';
import { checkRateLimit, getClientIp } from '../../lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface OpenRouterToolCall {
  id: string;
  type?: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: OpenRouterToolCall[];
}

export interface ExecutedToolRecord {
  name: string;
  args: Record<string, unknown>;
  result: unknown;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(
      clientIp,
      SITE_CONFIG.rateLimits.twin.maxRequests,
      SITE_CONFIG.rateLimits.twin.windowMs
    );

    const rateLimitHeaders = {
      'X-RateLimit-Limit': String(rateLimit.limit),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
      'X-RateLimit-Reset': String(rateLimit.reset),
    };

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded.',
          message:
            'You have reached the temporary chat message limit. Please wait a moment before trying again, or reach out to Tejas directly!',
        },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    // 2. Secret Key Validation
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OPENROUTER_API_KEY is not configured on the server.',
          message:
            "I'm having trouble connecting to my reasoning core right now. Please ensure OPENROUTER_API_KEY is configured in Vercel or your local environment.",
        },
        { status: 500, headers: rateLimitHeaders }
      );
    }

    const primaryModel = SITE_CONFIG.openRouterModel || 'openai/gpt-oss-120b';
    const fallbackModels = [
      primaryModel,
      'openrouter/free',
      'nvidia/nemotron-3-super-120b-a12b:free',
    ].filter(Boolean);

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const userMessages: ChatMessage[] = body.messages || [];

    if (!userMessages.length) {
      return NextResponse.json(
        { error: 'No messages provided.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // Prepare message chain with system prompt as the first message
    const messages: ChatMessage[] = [
      { role: 'system', content: TWIN_SYSTEM_PROMPT },
      ...userMessages.slice(-10), // Context window limited to last 10 messages for speed & token efficiency
    ];

    let currentIteration = 0;
    const maxIterations = 3;
    const toolsExecuted: ExecutedToolRecord[] = [];

    while (currentIteration < maxIterations) {
      currentIteration++;

      let openRouterRes: Response | null = null;
      let usedModel = primaryModel;

      // 1. First attempt: call OpenRouter with the models array and fallback routing
      try {
        openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': SITE_CONFIG.siteUrl,
            'X-Title': "Tejas Phutane's Digital Twin",
          },
          body: JSON.stringify({
            models: fallbackModels,
            route: 'fallback',
            messages,
            tools: TWIN_TOOLS,
            temperature: 0.6,
            max_tokens: 1000,
          }),
        });
      } catch (networkErr) {
        console.warn('[Digital Twin API] Initial fetch error:', networkErr);
      }

      // 2. If initial attempt failed or returned non-ok, cycle sequentially through fallback models
      if (!openRouterRes || !openRouterRes.ok) {
        console.warn(
          `[Digital Twin API] Primary request failed (status: ${openRouterRes?.status}). Attempting sequential fallbacks...`
        );

        for (const candidate of fallbackModels) {
          try {
            const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': SITE_CONFIG.siteUrl,
                'X-Title': "Tejas Phutane's Digital Twin",
              },
              body: JSON.stringify({
                model: candidate,
                messages,
                tools: TWIN_TOOLS,
                temperature: 0.6,
                max_tokens: 1000,
              }),
            });

            if (fallbackRes.ok) {
              openRouterRes = fallbackRes;
              usedModel = candidate;
              console.log(`[Digital Twin API] Successfully recovered using fallback model: ${candidate}`);
              break;
            } else {
              const errSnippet = await fallbackRes.text().catch(() => '');
              console.warn(`[Digital Twin API] Fallback model ${candidate} failed: ${fallbackRes.status} ${errSnippet}`);
            }
          } catch (candErr) {
            console.warn(`[Digital Twin API] Error trying candidate ${candidate}:`, candErr);
          }
        }
      }

      // 3. If OpenRouter is still unavailable, provide graceful knowledge response instead of 502 error
      if (!openRouterRes || !openRouterRes.ok) {
        console.error('[Digital Twin API] All OpenRouter models exhausted or unavailable.');
        
        // Intelligent contextual offline responder grounded in Tejas's actual engineering data
        const latestUserMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() || '';
        let gracefulContent = "I'm Tejas's AI Digital Twin. I can share details on his work across humanoid locomotion with the Unitree G1, C++ performance engineering, autonomous mobile robotics, and industrial vision deployments. Feel free to connect directly at " + SITE_CONFIG.targetEmail + "!";

        if (latestUserMsg.includes('g1') || latestUserMsg.includes('humanoid') || latestUserMsg.includes('unitree')) {
          gracefulContent = "Regarding the **Unitree G1 Humanoid**: At FEV India, Tejas is deploying RL-based locomotion policies, hardware-in-the-loop validation, and integrating ROS 2 with custom low-level C++ drivers for agile biped balance and disturbance rejection.";
        } else if (latestUserMsg.includes('quadruped') || latestUserMsg.includes('dog')) {
          gracefulContent = "Regarding **Quadruped Robotics**: Tejas developed trotting gait planners, inverse kinematics solvers, and whole-body controller interfaces running on embedded Linux platforms.";
        } else if (latestUserMsg.includes('wastefull') || latestUserMsg.includes('vision') || latestUserMsg.includes('industrial')) {
          gracefulContent = "At **Wastefull Insights**, Tejas engineered edge AI vision systems for automated material sorting, reducing compute overhead by over 80% through C++ optimizations and TensorRT acceleration.";
        } else if (latestUserMsg.includes('contact') || latestUserMsg.includes('hire') || latestUserMsg.includes('email') || latestUserMsg.includes('reach')) {
          gracefulContent = `You can reach Tejas directly at **${SITE_CONFIG.targetEmail}** or connect via LinkedIn. He is currently open to Senior/Staff Robotics and Physical AI engineering opportunities!`;
        }

        return NextResponse.json(
          {
            message: gracefulContent,
            toolsExecuted,
            model: 'embedded-grounded-core',
          },
          { headers: rateLimitHeaders }
        );
      }

      const data = await openRouterRes.json();
      const choice = data.choices?.[0];

      if (!choice) {
        return NextResponse.json(
          { error: 'No response choices returned by model.' },
          { status: 500, headers: rateLimitHeaders }
        );
      }

      const assistantMessage = choice.message;

      // Check if model wants to call tools
      if (choice.finish_reason === 'tool_calls' && assistantMessage.tool_calls?.length) {
        messages.push(assistantMessage);

        for (const toolCall of assistantMessage.tool_calls as OpenRouterToolCall[]) {
          const functionName = toolCall.function.name;
          const functionArgs = toolCall.function.arguments;

          console.log(`[Digital Twin API] Executing tool: ${functionName}`);
          const toolResult = await executeTool(functionName, functionArgs);

          let parsedArgs: Record<string, unknown> = {};
          try {
            parsedArgs = JSON.parse(functionArgs);
          } catch {
            // Leave as empty object if not JSON
          }

          toolsExecuted.push({
            name: functionName,
            args: parsedArgs,
            result: toolResult,
          });

          // Feed tool execution output back to model
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult),
          });
        }

        // Loop continues to let model synthesize final user-facing response with tool result
        continue;
      }

      // Final assistant response generated
      const finalAssistantContent =
        assistantMessage.content ||
        assistantMessage.reasoning ||
        "I'm here to chat about my robotics work, platforms, and career journey! What would you like to know?";

      return NextResponse.json(
        {
          message: finalAssistantContent,
          toolsExecuted,
          model: usedModel,
        },
        { headers: rateLimitHeaders }
      );
    }

    return NextResponse.json(
      {
        message: 'I processed your request and recorded the details. How else can I help?',
        toolsExecuted,
        model: primaryModel,
      },
      { headers: rateLimitHeaders }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Digital Twin API] Unexpected error in /api/twin route:', error);
    return NextResponse.json(
      {
        error: errorMsg,
        message: `Something went wrong while thinking. Please feel free to reach out directly to Tejas at ${SITE_CONFIG.targetEmail}!`,
      },
      { status: 500 }
    );
  }
}
