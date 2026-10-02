import fs from 'fs';
import path from 'path';

export interface UserDetailsArgs {
  email: string;
  name?: string;
  notes?: string;
}

export interface UnknownQuestionArgs {
  question: string;
}

// Ensure data logging directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

/**
 * Record user details when a visitor wants to get in touch.
 */
export async function recordUserDetails(args: UserDetailsArgs) {
  try {
    const dataDir = ensureDataDir();
    const filePath = path.join(dataDir, 'leads.jsonl');
    const entry = {
      timestamp: new Date().toISOString(),
      email: args.email,
      name: args.name || 'Not provided',
      notes: args.notes || 'Inquiry from Digital Twin Chat',
    };
    fs.appendFileSync(filePath, JSON.stringify(entry) + '\n', 'utf-8');
    console.log('[Digital Twin Tool] Recorded user details:', entry);

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
            to: ['tejasphutane.work@gmail.com'],
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
    return { status: 'error', message: 'Failed to record details to disk.' };
  }
}

/**
 * Record unanswered or non-public questions for Tejas's review.
 */
export async function recordUnknownQuestion(args: UnknownQuestionArgs) {
  try {
    const dataDir = ensureDataDir();
    const filePath = path.join(dataDir, 'unknown_questions.jsonl');
    const entry = {
      timestamp: new Date().toISOString(),
      question: args.question,
    };
    fs.appendFileSync(filePath, JSON.stringify(entry) + '\n', 'utf-8');
    console.log('[Digital Twin Tool] Recorded unknown question:', entry);

    return {
      status: 'success',
      message: `Recorded question for Tejas to review personally.`,
    };
  } catch (error) {
    console.error('[Digital Twin Tool] Error recording unknown question:', error);
    return { status: 'error', message: 'Failed to log question.' };
  }
}

/**
 * Dispatcher for tool calls
 */
export async function executeTool(name: string, argsJson: string): Promise<Record<string, any>> {
  let parsedArgs: Record<string, any> = {};
  try {
    parsedArgs = JSON.parse(argsJson);
  } catch (err) {
    return { status: 'error', message: 'Invalid tool arguments JSON' };
  }

  switch (name) {
    case 'record_user_details':
      return await recordUserDetails(parsedArgs as UserDetailsArgs);
    case 'record_unknown_question':
      return await recordUnknownQuestion(parsedArgs as UnknownQuestionArgs);
    default:
      return { status: 'error', message: `Unknown tool name: ${name}` };
  }
}
