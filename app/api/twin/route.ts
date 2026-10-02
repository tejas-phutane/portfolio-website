import { NextRequest, NextResponse } from 'next/server';
import { TWIN_SYSTEM_PROMPT, TWIN_TOOLS } from '../../lib/twinContext';
import { executeTool } from '../../lib/twinTools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: any[];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OPENROUTER_API_KEY is not configured on the server.',
          message: "I'm having trouble connecting to my reasoning core right now. Please ensure OPENROUTER_API_KEY is configured in Vercel or your local environment.",
        },
        { status: 500 }
      );
    }

    const modelName = process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b';
    const body = await req.json();
    const userMessages: ChatMessage[] = body.messages || [];

    if (!userMessages.length) {
      return NextResponse.json(
        { error: 'No messages provided.' },
        { status: 400 }
      );
    }

    // Prepare message chain with system prompt as the first message
    const messages: ChatMessage[] = [
      { role: 'system', content: TWIN_SYSTEM_PROMPT },
      ...userMessages.slice(-10), // Limit context history to last 10 messages for speed & token efficiency
    ];

    let currentIteration = 0;
    const maxIterations = 3;
    const toolsExecuted: Array<{ name: string; args: any; result: any }> = [];

    while (currentIteration < maxIterations) {
      currentIteration++;

      const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tejas-phutane-portfolio.web.app',
          'X-Title': "Tejas Phutane's Digital Twin",
        },
        body: JSON.stringify({
          model: modelName,
          messages,
          tools: TWIN_TOOLS,
          temperature: 0.6,
          max_tokens: 1000,
        }),
      });

      if (!openRouterRes.ok) {
        const errorText = await openRouterRes.text();
        console.error('[Digital Twin API] OpenRouter returned error:', openRouterRes.status, errorText);
        return NextResponse.json(
          {
            error: `OpenRouter API error: ${openRouterRes.status}`,
            message: "I'm experiencing high traffic on my neural reasoning backend right now. Feel free to ask me again or connect with Tejas directly via tejasphutane.work@gmail.com!",
          },
          { status: 502 }
        );
      }

      const data = await openRouterRes.json();
      const choice = data.choices?.[0];

      if (!choice) {
        return NextResponse.json(
          { error: 'No response choices returned by model.' },
          { status: 500 }
        );
      }

      const assistantMessage = choice.message;

      // Check if model wants to call tools
      if (choice.finish_reason === 'tool_calls' && assistantMessage.tool_calls?.length) {
        messages.push(assistantMessage);

        for (const toolCall of assistantMessage.tool_calls) {
          const functionName = toolCall.function.name;
          const functionArgs = toolCall.function.arguments;

          console.log(`[Digital Twin API] Executing tool: ${functionName}`);
          const toolResult = await executeTool(functionName, functionArgs);
          
          let parsedArgs = {};
          try {
            parsedArgs = JSON.parse(functionArgs);
          } catch (_) {}

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
      return NextResponse.json({
        message: assistantMessage.content || "I'm here to chat about my robotics work, platforms, and career journey! What would you like to know?",
        toolsExecuted,
        model: modelName,
      });
    }

    return NextResponse.json({
      message: "I processed your request and recorded the details. How else can I help?",
      toolsExecuted,
      model: modelName,
    });
  } catch (error: any) {
    console.error('[Digital Twin API] Unexpected error in /api/twin route:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal Server Error',
        message: "Something went wrong while thinking. Please feel free to reach out directly to Tejas at tejasphutane.work@gmail.com!",
      },
      { status: 500 }
    );
  }
}
