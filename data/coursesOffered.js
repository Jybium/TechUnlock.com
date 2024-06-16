import cybersecurity from "../assets/course-page/cybersecurity.svg";
import webDevelopment from "../assets/course-page/web-development.svg";

const courseOffered = [
  {
    id: 1,
    name: "Cyber Security Fundamentals",
    rating: 5,
    description:
      "Designed for individuals with little to no prior experience in the field, this course provides a solid foundation in cybersecurity essentials. Whether you're a curious enthusiast or considering a career switch, you'll gain practical knowledge and skills to navigate the digital landscape securely.",
    slug: "courses/cybersecurity",
    thumbnail: cybersecurity,

    details: {
      level: "Beginner",
      duration: "4 weeks",
      cost: "Free",
      module: "10 modules",
      certificate: true,
    },
  },
  {
    id: 2,
    name: "Introduction to Web Development",
    rating: 5,
    description:
      "Designed for individuals with little to no prior experience in the field, this course provides a solid foundation in cybersecurity essentials. Whether you're a curious enthusiast or considering a career switch, you'll gain practical knowledge and skills to navigate the digital landscape securely.",
    slug: "courses/web-development",
    thumbnail: webDevelopment,
    details: {
      level: "Beginner",
      duration: "4 weeks",
      cost: "Free",
      module: "10 modules",
      certificate: true,
    },
  },
];

export default courseOffered;
