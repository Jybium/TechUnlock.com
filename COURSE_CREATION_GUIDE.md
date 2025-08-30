# Course Creation System Guide

## Overview

The course creation system has been completely updated to match the comprehensive payload structure you provided. The system now supports:

- **Enhanced Course Metadata**: Title, short description, description, duration, pricing, and publication status
- **Rich Module Structure**: Modules with videos, summaries, and quizzes
- **Media Management**: Automatic Cloudinary upload for images and videos
- **Badge System**: Course completion badges with icons
- **Community Integration**: Community links for student engagement
- **Tagging System**: Course categorization with tags
- **Legacy Support**: Backward compatibility with existing fields

## Payload Structure

The system now accepts the following comprehensive payload structure:

```json
{
  "title": "Full-Stack Web Development",
  "short_description": "Learn how to build web applications from scratch.",
  "description": "This course covers frontend and backend technologies including HTML, CSS, JavaScript, Python, and Django.",
  "duration": "10 weeks",
  "is_published": true,
  "is_paid": true,
  "price": 20000,
  "cover_image": "https://example.com/images/fullstack-cover.jpg",
  "tags": ["web", "Python", "Fullstack", "javascript"],
  "modules": [
    {
      "title": "Introduction to Web Development",
      "description": "Understanding the basics of how the web works.",
      "duration": "1 week",
      "order": 1,
      "videos": [
        {
          "title": "What is Web Development?",
          "description": "Overview of frontend and backend",
          "video_url": "https://example.com/videos/intro.mp4",
          "duration": "12:30"
        }
      ],
      "summaries": [
        {
          "text": "Web development involves building and maintaining websites..."
        }
      ],
      "quizzes": [
        {
          "question": "Which language is used to structure web pages?",
          "option_a": "Python",
          "option_b": "HTML",
          "option_c": "CSS",
          "option_d": "JavaScript",
          "correct_answer": "B"
        }
      ]
    }
  ],
  "badge": {
    "title": "Certified Fullstack Developer",
    "description": "Awarded after successful course completion.",
    "icon": "https://example.com/badges/fullstack.png"
  },
  "community_link": {
    "description": "Join the student community for help and collaboration.",
    "link": "https://community.example.com/fullstack-course"
  }
}
```

## Key Features

### 1. Media Upload System

All media files are automatically uploaded to Cloudinary:

- **Images**: Cover images, badge icons, addon images
- **Videos**: Module video content
- **Automatic Processing**: Files are converted to secure URLs

### 2. Module Management

Each module can contain:

- **Basic Info**: Title, description, duration, order
- **Videos**: Multiple videos with metadata
- **Summaries**: Text summaries for each module
- **Quizzes**: Multiple choice questions with options

### 3. Enhanced Form Features

The form includes:

- **Dynamic Module Addition**: Add/remove modules as needed
- **Video Upload**: File upload or URL input for videos
- **Quiz Builder**: Create multiple choice quizzes
- **Summary Editor**: Rich text editing for summaries
- **Tag Selection**: Multi-select dropdown for course tags

### 4. Validation System

Comprehensive validation using Zod schema:

- **Required Fields**: Title, description, duration, etc.
- **URL Validation**: For video URLs and community links
- **File Validation**: For uploaded media files
- **Quiz Validation**: Ensures all quiz options are provided

## Form Sections

### 1. Course Details

- Course title
- Short description
- Full description
- Cover image upload

### 2. Course Settings

- Duration selection
- Price setting
- Publication status
- Payment status
- Tag selection

### 3. Modules

- Dynamic module creation
- Video upload/URL input
- Summary text editing
- Quiz creation with multiple choice options

### 4. Badge System

- Badge title and description
- Badge icon upload

### 5. Community Integration

- Community link description
- Community URL

### 6. Legacy Fields (Optional)

- Category selection
- Difficulty level
- Certificate availability
- Instructor information
- Start date/time
- Skills to gain

## API Integration

### Service Functions

The system uses the following service functions:

```javascript
// Create a new course
import { createCourse } from "@/services/admin";

const result = await createCourse(courseData);
```

### Media Upload Process

1. **File Selection**: User selects files in the form
2. **Cloudinary Upload**: Files are uploaded to Cloudinary
3. **URL Generation**: Secure URLs are generated
4. **Data Preparation**: URLs are included in the final payload
5. **API Submission**: Complete data is sent to the server

## Error Handling

The system includes comprehensive error handling:

- **Network Errors**: Offline detection and user notification
- **Upload Errors**: Cloudinary upload failure handling
- **Validation Errors**: Form validation with user-friendly messages
- **API Errors**: Server response error handling

## Usage Example

```javascript
// Example of creating a course with the new structure
const courseData = {
  title: "Advanced React Development",
  short_description: "Master React with advanced patterns and best practices",
  description:
    "Comprehensive course covering React hooks, context, performance optimization...",
  duration: "8 weeks",
  is_published: false,
  is_paid: true,
  price: 15000,
  tags: ["React", "JavaScript", "Frontend"],
  modules: [
    {
      title: "React Hooks Deep Dive",
      description: "Understanding useState, useEffect, and custom hooks",
      duration: "1 week",
      order: 1,
      videos: [
        {
          title: "Introduction to Hooks",
          description: "Why hooks were introduced",
          video_url: "https://cloudinary.com/video1.mp4",
          duration: "15:30",
        },
      ],
      summaries: [
        {
          text: "Hooks allow you to use state and other React features in functional components.",
        },
      ],
      quizzes: [
        {
          question: "Which hook is used for side effects?",
          option_a: "useState",
          option_b: "useEffect",
          option_c: "useContext",
          option_d: "useReducer",
          correct_answer: "B",
        },
      ],
    },
  ],
  badge: {
    title: "React Expert",
    description: "Certified React Developer",
    icon: "https://cloudinary.com/badge-icon.png",
  },
  community_link: {
    description: "Join our React developers community",
    link: "https://discord.gg/react-community",
  },
};

// Submit the course
const result = await createCourse(courseData);
```

## Migration Notes

### From Old System

The new system maintains backward compatibility with existing fields:

- `category`, `difficulty`, `is_certificate` - Still supported
- `instructor_name`, `start_date`, `start_time` - Optional fields
- `course_skills` - Converted to tags format
- `addon` - Still supported for additional content

### Breaking Changes

- `description` field is now required (was optional)
- `modules` structure has changed significantly
- New required fields: `short_description`, `is_published`, `is_paid`

## Testing

To test the new system:

1. **Form Validation**: Fill out all required fields
2. **Media Upload**: Test image and video uploads
3. **Module Creation**: Add modules with videos, summaries, and quizzes
4. **Badge Creation**: Test badge icon upload
5. **API Integration**: Verify successful course creation

## Troubleshooting

### Common Issues

1. **Media Upload Fails**: Check Cloudinary configuration
2. **Validation Errors**: Ensure all required fields are filled
3. **Module Order Issues**: Verify module order numbers are sequential
4. **Quiz Validation**: Ensure all quiz options and correct answer are provided

### Debug Mode

Enable console logging to debug issues:

```javascript
console.log("Form data:", data);
console.log("Upload response:", cloudinaryResponse);
console.log("Final data:", finalData);
```

## Future Enhancements

Potential improvements for the system:

1. **Bulk Media Upload**: Upload multiple files simultaneously
2. **Rich Text Editor**: Enhanced editing for descriptions
3. **Preview Mode**: Preview course before publishing
4. **Template System**: Pre-built course templates
5. **Analytics Integration**: Track course creation metrics
