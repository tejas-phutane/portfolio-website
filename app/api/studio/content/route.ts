import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getFilePath(filename: string): string {
  return path.join(process.cwd(), 'content', 'data', filename);
}

function isStudioAllowed(): boolean {
  // Only allow studio modifications in development or if explicitly enabled
  return process.env.NODE_ENV !== 'production' || process.env.ALLOW_STUDIO_IN_PROD === 'true';
}

export async function GET() {
  if (!isStudioAllowed()) {
    return NextResponse.json({ error: 'Studio is disabled in production.' }, { status: 403 });
  }

  try {
    const projectsRaw = fs.readFileSync(getFilePath('projects.json'), 'utf-8');
    const experienceRaw = fs.readFileSync(getFilePath('experience.json'), 'utf-8');
    const servicesRaw = fs.readFileSync(getFilePath('services.json'), 'utf-8');
    const aboutRaw = fs.readFileSync(getFilePath('about.json'), 'utf-8');
    const twinRaw = fs.readFileSync(getFilePath('twin.json'), 'utf-8');
    const blogsRaw = fs.readFileSync(getFilePath('blogs.json'), 'utf-8');

    return NextResponse.json({
      projects: JSON.parse(projectsRaw),
      experience: JSON.parse(experienceRaw),
      services: JSON.parse(servicesRaw),
      about: JSON.parse(aboutRaw),
      twinMemory: JSON.parse(twinRaw).systemPrompt,
      blogs: JSON.parse(blogsRaw),
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to read content files.';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isStudioAllowed()) {
    return NextResponse.json({ error: 'Studio is disabled in production.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { section, content } = body;

    if (!section || content === undefined) {
      return NextResponse.json({ error: 'Missing section or content payload.' }, { status: 400 });
    }

    switch (section) {
      case 'projects':
        fs.writeFileSync(getFilePath('projects.json'), JSON.stringify(content, null, 2), 'utf-8');
        break;
      case 'experience':
        fs.writeFileSync(getFilePath('experience.json'), JSON.stringify(content, null, 2), 'utf-8');
        break;
      case 'services':
        fs.writeFileSync(getFilePath('services.json'), JSON.stringify(content, null, 2), 'utf-8');
        break;
      case 'about':
        fs.writeFileSync(getFilePath('about.json'), JSON.stringify(content, null, 2), 'utf-8');
        break;
      case 'blogs':
        fs.writeFileSync(getFilePath('blogs.json'), JSON.stringify(content, null, 2), 'utf-8');
        break;
      case 'twinMemory':
        fs.writeFileSync(
          getFilePath('twin.json'),
          JSON.stringify({ systemPrompt: content }, null, 2),
          'utf-8'
        );
        break;
      default:
        return NextResponse.json({ error: `Unknown section: ${section}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `Successfully updated ${section}.` });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to save content.';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
