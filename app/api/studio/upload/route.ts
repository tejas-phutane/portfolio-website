import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isStudioAllowed(): boolean {
  return process.env.NODE_ENV !== 'production' || process.env.ALLOW_STUDIO_IN_PROD === 'true';
}

export async function POST(req: NextRequest) {
  if (!isStudioAllowed()) {
    return NextResponse.json({ error: 'Upload is disabled in production.' }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename to prevent directory traversal or invalid characters
    const originalName = file.name || 'uploaded_image.png';
    const ext = path.extname(originalName).toLowerCase() || '.png';
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const finalFilename = `${baseName}_${Date.now()}${ext}`;

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const destinationPath = path.join(imagesDir, finalFilename);
    fs.writeFileSync(destinationPath, buffer);

    console.log(`[Studio Upload] Saved image to: ${destinationPath}`);

    return NextResponse.json({
      success: true,
      url: `/images/${finalFilename}`,
      filename: finalFilename,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Upload failed.';
    console.error('[Studio Upload] Error saving file:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
