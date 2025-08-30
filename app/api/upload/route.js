import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    const courseTitle = formData.get("courseTitle");
    const index = formData.get("index");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get Bunny.net credentials from environment variables
    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME;
    const storage = process.env.NEXT_PUBLIC_STORAGE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;

    if (!storageZoneName || !accessKey || !storage) {
      return NextResponse.json(
        { error: "Bunny.net credentials are not configured" },
        { status: 500 }
      );
    }

    // Determine folder based on content type
    const getContentTypeFolder = (contentType) => {
      switch (contentType.toLowerCase()) {
        case "image":
        case "images":
          return "images";
        case "video":
        case "videos":
          return "video";
        case "badge":
        case "badges":
          return "badges";
        default:
          return "images";
      }
    };

    const folder = getContentTypeFolder(type);
    const path = `/courses/${folder}`;

    // Create filename
    let fileName;
    if (courseTitle && courseTitle.trim() && index) {
      const sanitizedTitle = courseTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      const fileExtension = file.name.split(".").pop() || "jpg";
      fileName = `${sanitizedTitle}-${index}.${fileExtension}`;
    } else {
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      fileName = `${Date.now()}-${sanitizedFileName}`;
    }

    const uploadUrl = `https://storage.bunnycdn.com/${storageZoneName}${path}/${fileName}`;
    const publicUrl = `https://${storage}.b-cdn.net${path}/${fileName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Bunny.net
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: accessKey,
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bunny.net upload failed:", errorText);
      return NextResponse.json(
        { error: `Upload failed: ${errorText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
