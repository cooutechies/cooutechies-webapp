/**
 * Cloudinary Upload API Route
 * Handles file uploads to Cloudinary
 * Accepts files via FormData and returns the public URL and public_id
 */

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export async function POST(request: Request) {
  try {
    // Extract file from FormData
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Validate file exists
    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 5MB per CONTRIBUTING.md)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 5MB limit" },
        { status: 400 }
      );
    }

    // Validate MIME type per CONTRIBUTING.md
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed types: JPEG, PNG, WEBP, GIF, SVG" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder = (formData.get("folder") as string) || "cooutechies";

    // Upload to Cloudinary using upload_stream
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, uploadResult) => {
          if (error || !uploadResult) reject(error || new Error("Upload failed"));
          else resolve(uploadResult);
        }
      );

      // End the stream with the buffer
      uploadStream.end(buffer);
    });

    return NextResponse.json({ 
      success: true, 
      fileUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error("Error in upload API route:", error);
    return NextResponse.json(
      {
        error: `Failed to upload file: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 },
    );
  }
}
