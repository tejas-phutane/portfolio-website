import { test, expect } from '@playwright/test';
import { TWIN_SYSTEM_PROMPT, TWIN_TOOLS } from '../app/lib/twinContext';

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
});
