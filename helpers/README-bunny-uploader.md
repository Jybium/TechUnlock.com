# Bunny.net Uploader

This module provides functions for uploading files to Bunny.net CDN with organized folder structure.

## Folder Structure

Files are organized into the following folders:

- `/images` - For images, GIFs, and general image files
- `/video` - For video files
- `/badges` - For badge images
- `/profiles/images` - For user profile pictures
- `/courses/images` - For course-related images
- `/courses/video` - For course videos
- `/courses/badges` - For course badges

## Functions

### `uploadToBunny(file, contentType)`

Generic upload function for any file type.

**Parameters:**

- `file` (File) - The file to upload
- `contentType` (string) - Type of content ("image", "video", "badge", etc.)

**Returns:** Promise<string> - The public URL of the uploaded file

**Example:**

```javascript
import { uploadToBunny } from "@/helpers/bunny-uploader";

const file = event.target.files[0];
const url = await uploadToBunny(file, "image");
```

### `uploadCourseMedia(file, contentType, courseTitle?, index?)`

Upload function specifically for course-related media.

**Parameters:**

- `file` (File) - The file to upload
- `contentType` (string) - Type of content ("image", "video", "badge")
- `courseTitle` (string, optional) - Course title for naming
- `index` (number|string, optional) - Index for file naming

**Returns:** Promise<string> - The public URL of the uploaded file

**Example:**

```javascript
import { uploadCourseMedia } from "@/helpers/bunny-uploader";

// Upload course cover image
const coverUrl = await uploadCourseMedia(
  file,
  "image",
  "Web Development Course"
);

// Upload course video
const videoUrl = await uploadCourseMedia(
  file,
  "video",
  "Web Development Course",
  "module-1-video-1"
);

// Upload course badge
const badgeUrl = await uploadCourseMedia(
  file,
  "badge",
  "Web Development Course"
);
```

### `uploadProfileImage(file, userId?)`

Upload function for user profile images.

**Parameters:**

- `file` (File) - The profile image file
- `userId` (string, optional) - User ID for consistent naming

**Returns:** Promise<string> - The public URL of the uploaded file

**Example:**

```javascript
import { uploadProfileImage } from "@/helpers/bunny-uploader";

const profileUrl = await uploadProfileImage(file, "user123");
```

## Environment Variables Required

Make sure these environment variables are set in your `.env.local`:

```env
NEXT_PUBLIC_BUNNY_STORAGE_ZONE_NAME=your-storage-zone-name
NEXT_PUBLIC_STORAGE=your-storage-zone-name
NEXT_PUBLIC_BUNNY_ACCESS_KEY=your-access-key
```

## Usage in Components

### Course Creation

```javascript
import { uploadCourseMedia } from "@/helpers/bunny-uploader";

const handleImageUpload = async (file) => {
  try {
    const url = await uploadCourseMedia(file, "image", courseTitle);
    setCoverImage(url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### Profile Settings

```javascript
import { uploadProfileImage } from "@/helpers/bunny-uploader";

const handleProfileImageUpload = async (file) => {
  try {
    const url = await uploadProfileImage(file, userId);
    setProfileImage(url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

## Error Handling

All functions include proper error handling and will show toast notifications for common errors like missing credentials or upload failures.

## Legacy Functions

The following functions are deprecated but maintained for backward compatibility:

- `uploadFeaturedStoryMedia` - Use `uploadCourseMedia` instead
- `uploadCreatorMedia` - Use `uploadProfileImage` instead

These functions will show console warnings when used.
