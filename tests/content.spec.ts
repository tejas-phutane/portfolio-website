import { test, expect } from '@playwright/test';
import {
  getProjectsData,
  getExperienceData,
  getServicesData,
  getAboutData,
} from '../app/lib/content';

test.describe('Structured Portfolio Content Loader', () => {
  test('getProjectsData returns list of valid projects', () => {
    const projects = getProjectsData();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThanOrEqual(5);

    const first = projects[0];
    expect(first.id).toBeDefined();
    expect(first.title).toBeDefined();
    expect(first.category).toBeDefined();
    expect(first.imageUrl).toMatch(/^\/images\//);
    expect(Array.isArray(first.implementation)).toBe(true);
    expect(Array.isArray(first.results)).toBe(true);
  });

  test('getExperienceData returns career history with achievements', () => {
    const experience = getExperienceData();
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThanOrEqual(3);

    const current = experience.find((e) => e.current);
    expect(current).toBeDefined();
    expect(current?.role).toContain('Senior Engineer');
    expect(current?.company).toContain('FEV India');
    expect(current?.achievements.length).toBeGreaterThan(0);
  });

  test('getServicesData returns offerings with icon names', () => {
    const services = getServicesData();
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThanOrEqual(5);

    const first = services[0];
    expect(first.title).toBeDefined();
    expect(first.desc).toBeDefined();
    expect(typeof first.iconName).toBe('string');
  });

  test('getAboutData returns narrative paragraphs and highlights', () => {
    const about = getAboutData();
    expect(about).toBeDefined();
    expect(about.paragraphs.length).toBeGreaterThanOrEqual(3);
    expect(about.highlights.length).toBeGreaterThanOrEqual(3);
    expect(about.exploring.length).toBeGreaterThanOrEqual(2);
  });
});
