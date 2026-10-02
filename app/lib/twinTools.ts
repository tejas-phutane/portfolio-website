import fs from 'fs';
import path from 'path';
import { SITE_CONFIG } from './config';

export interface UserDetailsArgs {
  email: string;
  name?: string;
  notes?: string;
}

export interface UnknownQuestionArgs {
  question: string;
}

export interface ToolResult {
  status: 'success' | 'error';
  message: string;
}

/**
 * Locate a writeable directory for data logging.
 * In serverless environments (e.g. Vercel), the local filesystem may be read-only.
 * We attempt process.cwd()/data first (local dev), then /tmp/portfolio-data, or gracefully degrade to structured stdout.
 */
function getSafeStoragePath(filename: string): string | null {
  const candidateDirs = [
    path.join(process.cwd(), 'data'),
    path.join('/tmp', 'portfolio-data'),
  ];

  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const testFile = path.join(dir, `.write_test_${Date.now()}`);
      fs.writeFileSync(testFile, 'ok', 'utf-8');
      fs.unlinkSync(testFile);
      return path.join(dir, filename);
    } catch {
      // Writable test failed, try next candidate
    }
  }
  return null;
}

/**
 * Record user details when a visitor wants to get in touch.
 * Emits structured telemetry for serverless log aggregators (Vercel Log Drains)
 * and forwards via email if RESEND_API_KEY is configured.
 */
export async function recordUserDetails(args: UserDetailsArgs): Promise<ToolResult> {
  try {
    const entry = {
      timestamp: new Date().toISOString(),
      email: args.email,
      name: args.name || 'Not provided',
      notes: args.notes || 'Inquiry from Digital Twin Chat',
    };

    // Structured serverless telemetry
    console.log('[LEAD_AUDIT]', JSON.stringify(entry));

    // Best-effort write to local or /tmp filesystem
    const targetFile = getSafeStoragePath('leads.jsonl');
    if (targetFile) {
      try {
        fs.appendFileSync(targetFile, JSON.stringify(entry) + '\n', 'utf-8');
      } catch (fsErr) {
        console.warn('[Digital Twin Tool] Disk logging skipped (read-only filesystem):', fsErr);
      }
    }

    // Optional email notification via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Digital Twin <onboarding@resend.dev>',
            to: [SITE_CONFIG.targetEmail],
            subject: `[Digital Twin Lead] Inquiry from ${args.name || args.email}`,
            text: `New lead from your portfolio Digital Twin:\n\nEmail: ${args.email}\nName: ${args.name || 'Not provided'}\nNotes: ${args.notes || 'None'}\nTime: ${entry.timestamp}`,
          }),
        });
      } catch (emailErr) {
        console.warn('[Digital Twin Tool] Resend notification failed (non-critical):', emailErr);
      }
    }

    return {
      status: 'success',
      message: `Recorded contact details for ${args.email}. Tejas will follow up soon.`,
    };
  } catch (error) {
    console.error('[Digital Twin Tool] Error recording user details:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to record details.',
    };
  }
}

/**
 * Record unanswered or non-public questions for Tejas's review.
 */
export async function recordUnknownQuestion(args: UnknownQuestionArgs): Promise<ToolResult> {
  try {
    const entry = {
      timestamp: new Date().toISOString(),
      question: args.question,
    };

    // Structured serverless telemetry
    console.log('[QUESTION_AUDIT]', JSON.stringify(entry));

    const targetFile = getSafeStoragePath('unknown_questions.jsonl');
    if (targetFile) {
      try {
        fs.appendFileSync(targetFile, JSON.stringify(entry) + '\n', 'utf-8');
      } catch (fsErr) {
        console.warn('[Digital Twin Tool] Disk logging skipped (read-only filesystem):', fsErr);
      }
    }

    return {
      status: 'success',
      message: 'Recorded question for Tejas to review personally.',
    };
  } catch (error) {
    console.error('[Digital Twin Tool] Error recording unknown question:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to log question.',
    };
  }
}

/**
 * Dispatcher for tool calls
 */
export async function executeTool(name: string, argsJson: string): Promise<ToolResult> {
  let parsedArgs: Record<string, unknown> = {};
  try {
    parsedArgs = JSON.parse(argsJson);
  } catch {
    return { status: 'error', message: 'Invalid tool arguments JSON' };
  }

  switch (name) {
    case 'record_user_details':
      return await recordUserDetails({
        email: typeof parsedArgs.email === 'string' ? parsedArgs.email : '',
        name: typeof parsedArgs.name === 'string' ? parsedArgs.name : undefined,
        notes: typeof parsedArgs.notes === 'string' ? parsedArgs.notes : undefined,
      });
    case 'record_unknown_question':
      return await recordUnknownQuestion({
        question: typeof parsedArgs.question === 'string' ? parsedArgs.question : '',
      });
    default:
      return { status: 'error', message: `Unknown tool name: ${name}` };
  }
}
