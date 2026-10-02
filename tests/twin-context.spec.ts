import { test, expect } from '@playwright/test';
import { TWIN_SYSTEM_PROMPT, TWIN_TOOLS } from '../app/lib/twinContext';
import { executeTool, recordUserDetails, recordUnknownQuestion } from '../app/lib/twinTools';

test.describe('Digital Twin Context & Knowledge Engine', () => {
  test('TWIN_SYSTEM_PROMPT exports valid string with required context', () => {
    expect(typeof TWIN_SYSTEM_PROMPT).toBe('string');
    expect(TWIN_SYSTEM_PROMPT.length).toBeGreaterThan(500);

    // Verify key platform details are in context
    expect(TWIN_SYSTEM_PROMPT).toContain('Unitree G1');
    expect(TWIN_SYSTEM_PROMPT).toContain('Inspire');
    expect(TWIN_SYSTEM_PROMPT).toContain('Sim-to-Real');
    expect(TWIN_SYSTEM_PROMPT).toContain('Wastefull Insights');
    expect(TWIN_SYSTEM_PROMPT).toContain('Robotics Gallery');
    expect(TWIN_SYSTEM_PROMPT).toContain('DRDO');
    expect(TWIN_SYSTEM_PROMPT).toContain('FEV India');
  });

  test('TWIN_TOOLS provides record_user_details and record_unknown_question tools', () => {
    expect(Array.isArray(TWIN_TOOLS)).toBe(true);
    expect(TWIN_TOOLS.length).toBeGreaterThanOrEqual(2);

    const toolNames = TWIN_TOOLS.map(t => t.function.name);
    expect(toolNames).toContain('record_user_details');
    expect(toolNames).toContain('record_unknown_question');
  });

  test('recordUserDetails runs gracefully and returns success status', async () => {
    const res = await recordUserDetails({
      email: 'recruiter@robotics-ai.com',
      name: 'Test Recruiter',
      notes: 'Interested in humanoid locomotion research',
    });
    expect(res.status).toBe('success');
    expect(res.message).toContain('recruiter@robotics-ai.com');
  });

  test('recordUnknownQuestion logs question without throwing errors', async () => {
    const res = await recordUnknownQuestion({
      question: 'What is the exact reduction ratio on the hip yaw actuator?',
    });
    expect(res.status).toBe('success');
    expect(res.message).toBeDefined();
  });

  test('executeTool handles valid and invalid JSON safely', async () => {
    const validRes = await executeTool(
      'record_user_details',
      JSON.stringify({ email: 'partner@tech.com', name: 'Partner' })
    );
    expect(validRes.status).toBe('success');

    const invalidJsonRes = await executeTool('record_user_details', '{ invalid json');
    expect(invalidJsonRes.status).toBe('error');
    expect(invalidJsonRes.message).toContain('Invalid tool arguments');

    const unknownToolRes = await executeTool('non_existent_tool', '{}');
    expect(unknownToolRes.status).toBe('error');
    expect(unknownToolRes.message).toContain('Unknown tool name');
  });
});
