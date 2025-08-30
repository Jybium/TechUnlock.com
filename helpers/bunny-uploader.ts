import toast from "react-hot-toast";

export const uploadToBunny = async (
  file: File,
  contentType: string
): Promise<string> => {
  const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME;
  const storage = process.env.NEXT_PUBLIC_STORAGE;
  const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;

  if (!storageZoneName || !accessKey || !storage) {
    const errorMessage = "Bunny.net credentials are not configured.";
    toast.error(errorMessage);
    console.error(
      "Error: Make sure NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME, NEXT_PUBLIC_STORAGE, and NEXT_PUBLIC_BUNNY_ACCESS_KEY are set."
    );
    throw new Error(errorMessage);
  }

  const getContentTypeFolder = (type: string): string => {
    switch (type.toLowerCase()) {
      case "image":
      case "images":
        return "images";
      case "video":
      case "videos":
        return "video";
      case "badge":
      case "badges":
        return "badges";
      case "gif":
      case "gifs":
        return "images"; // Store GIFs in images folder
      default:
        return "images"; // Default to images folder
    }
  };

  const folder = getContentTypeFolder(contentType);
  const path = `/${folder}`;

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;

  const uploadUrl = `https://storage.bunnycdn.com/${storageZoneName}${path}/${uniqueFileName}`;
  const publicUrl = `https://${storage}.b-cdn.net${path}/${uniqueFileName}`;

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": "application/octet-stream",
    },
    body: file,
    // Add timeout for large files
    signal: AbortSignal.timeout(300000), // 5 minutes timeout
  });

  if (!response.ok) {
    let errorDetails = "An unknown error occurred.";
    try {
      // Try to parse error response as text first, as it may not be JSON
      const errorText = await response.text();
      // Attempt to parse as JSON if it's a string that looks like a JSON object
      errorDetails = JSON.parse(errorText).Message || errorText;
    } catch (e) {
      // Fallback if parsing fails
      console.error("Could not parse Bunny.net error response", e);
    }
    console.error("Failed to upload to Bunny.net:", errorDetails);
    throw new Error(`Upload failed: ${errorDetails}`);
  }

  return publicUrl;
};

// Generic function for uploading course-related media
export const uploadCourseMedia = async (
  file: File,
  contentType: string,
  courseTitle?: string,
  index?: number | string
): Promise<string> => {
  const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME;
  const storage = process.env.NEXT_PUBLIC_STORAGE;
  const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;

  if (!storageZoneName || !accessKey || !storage) {
    const errorMessage = "Bunny.net credentials are not configured.";
    toast.error(errorMessage);
    console.error(
      "Error: Make sure NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME, NEXT_PUBLIC_STORAGE, and NEXT_PUBLIC_BUNNY_ACCESS_KEY are set."
    );
    throw new Error(errorMessage);
  }

  const getContentTypeFolder = (type: string): string => {
    switch (type.toLowerCase()) {
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

  const folder = getContentTypeFolder(contentType);
  const path = `/courses/${folder}`;

  // Create a more descriptive filename if course title is provided
  let fileName: string;
  if (courseTitle && courseTitle.trim() && index !== undefined) {
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

  console.log("Uploading to:", uploadUrl);

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": "application/octet-stream",
    },
    body: file,
    // Add timeout for large files
    signal: AbortSignal.timeout(300000), // 5 minutes timeout
  });

  if (!response.ok) {
    let errorDetails = "An unknown error occurred.";
    try {
      const errorText = await response.text();
      errorDetails = JSON.parse(errorText).Message || errorText;
    } catch (e) {
      console.error("Could not parse Bunny.net error response", e);
    }
    console.error("Failed to upload to Bunny.net:", errorDetails);
    console.error("Response status:", response.status);
    console.error("Response headers:", response.headers);
    throw new Error(`Upload failed: ${errorDetails}`);
  }

  console.log("Upload successful:", publicUrl);
  return publicUrl;
};

// Function for uploading profile images
export const uploadProfileImage = async (
  file: File,
  userId?: string
): Promise<string> => {
  const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME;
  const storage = process.env.NEXT_PUBLIC_STORAGE;
  const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;

  if (!storageZoneName || !accessKey || !storage) {
    const errorMessage = "Bunny.net credentials are not configured.";
    toast.error(errorMessage);
    console.error(
      "Error: Make sure NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME, NEXT_PUBLIC_STORAGE, and NEXT_PUBLIC_BUNNY_ACCESS_KEY are set."
    );
    throw new Error(errorMessage);
  }

  const path = "/profiles/images";

  // Create filename with user ID if provided
  let fileName: string;
  if (userId) {
    const fileExtension = file.name.split(".").pop() || "jpg";
    fileName = `profile-${userId}.${fileExtension}`;
  } else {
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    fileName = `${Date.now()}-${sanitizedFileName}`;
  }

  const uploadUrl = `https://storage.bunnycdn.com/${storageZoneName}${path}/${fileName}`;
  const publicUrl = `https://${storage}.b-cdn.net${path}/${fileName}`;

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": "application/octet-stream",
    },
    body: file,
    // Add timeout for large files
    signal: AbortSignal.timeout(300000), // 5 minutes timeout
  });

  if (!response.ok) {
    let errorDetails = "An unknown error occurred.";
    try {
      const errorText = await response.text();
      errorDetails = JSON.parse(errorText).Message || errorText;
    } catch (e) {
      console.error("Could not parse Bunny.net error response", e);
    }
    console.error("Failed to upload to Bunny.net:", errorDetails);
    throw new Error(`Upload failed: ${errorDetails}`);
  }

  return publicUrl;
};

// Legacy functions for backward compatibility (deprecated)
export const uploadFeaturedStoryMedia = async (
  file: File,
  storyTitle: string,
  index: number | string
): Promise<string> => {
  console.warn(
    "uploadFeaturedStoryMedia is deprecated. Use uploadCourseMedia instead."
  );
  return uploadCourseMedia(file, "image", storyTitle, index);
};

export const uploadCreatorMedia = async (
  file: File,
  storyTitle: string,
  index: number | string
): Promise<string> => {
  console.warn(
    "uploadCreatorMedia is deprecated. Use uploadProfileImage instead."
  );
  return uploadProfileImage(file);
};
