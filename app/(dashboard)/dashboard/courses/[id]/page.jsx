"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Clock,
  Video,
  FileText,
  HelpCircle,
  DollarSign,
  GraduationCap,
  Play,
  Lock,
  BookOpen,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getCourseDetails } from "@/services/course";
import { enrollInCourse } from "@/services/course";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import Image from "next/image";

const CourseDetailsPage = ({ params }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in real app, this would be fetched based on params.id
  const mockCourseData = {
    id: params.id,
    title: "Introduction to Digital Marketing",
    description:
      "This beginner-friendly course introduces you to digital marketing, covering understanding audiences, social media, content creation, targeted ads, and performance measurement. Learn to connect with customers and optimize campaigns - no tech background needed.",
    rating: 4.0,
    totalLearners: 148,
    totalReviews: 89,
    trainingLevel: "Beginner",
    lastUpdated: "1 week ago",
    price: 0, // Free course
    originalPrice: 99, // Original price if it was paid
    courseInfo: {
      timeToComplete: "~6 hours",
      learningFormat: "Videos",
      modules: "10 modules",
      quizzes: "10 quiz",
      certificate: "Yes",
      access: "Lifetime",
    },
    instructor: {
      name: "Sarah Johnson",
      title: "Digital Marketing Expert",
      company: "TechUnlock",
      avatar: "👩‍💼",
    },
    learningObjectives: [
      "Understanding digital marketing and its importance, connecting with audiences online.",
      "Identifying and understanding target audiences using tools like personas.",
      "Diving into social media marketing fundamentals (Instagram, TikTok, Twitter, LinkedIn, YouTube), creating engaging content.",
      "Exploring social media advertising, running targeted ads, setting objectives, and managing budgets.",
      "Gaining insights into content marketing and influencer marketing, building trust, and collaborating with influencers.",
      "Course performance and optimization, tracking metrics across websites, social media, email, and paid ads, and using data for improvement.",
    ],
    skills: [
      "Audience Research and Persona Building",
      "Digital Marketing Basics",
      "Social Media Marketing",
      "Social Media Advertising",
      "Content Marketing",
      "Influencer Marketing",
      "Performance Tracking & Data Analysis",
      "Campaign Optimization",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Digital Marketing",
        description:
          "Learn the basics of digital marketing and its importance in today's business landscape.",
        videos: 4,
        duration: "45 minutes",
        lessons: [
          {
            id: 1,
            title: "What is Digital Marketing?",
            duration: "10 min",
            preview: true,
          },
          {
            id: 2,
            title: "The Digital Marketing Landscape",
            duration: "12 min",
            preview: false,
          },
          {
            id: 3,
            title: "Digital vs Traditional Marketing",
            duration: "8 min",
            preview: false,
          },
          { id: 4, title: "Module Quiz", duration: "15 min", preview: false },
        ],
      },
      {
        id: 2,
        title: "Understanding Your Audience",
        description:
          "Learn how to identify and understand your target audience using personas and research tools.",
        videos: 3,
        duration: "35 minutes",
        lessons: [
          {
            id: 5,
            title: "Creating Buyer Personas",
            duration: "15 min",
            preview: false,
          },
          {
            id: 6,
            title: "Market Research Techniques",
            duration: "12 min",
            preview: false,
          },
          { id: 7, title: "Module Quiz", duration: "8 min", preview: false },
        ],
      },
      {
        id: 3,
        title: "Social Media Marketing Fundamentals",
        description:
          "Master the fundamentals of social media marketing across major platforms.",
        videos: 5,
        duration: "60 minutes",
        lessons: [
          {
            id: 8,
            title: "Instagram Marketing",
            duration: "15 min",
            preview: false,
          },
          {
            id: 9,
            title: "TikTok Marketing",
            duration: "12 min",
            preview: false,
          },
          {
            id: 10,
            title: "Twitter Marketing",
            duration: "10 min",
            preview: false,
          },
          {
            id: 11,
            title: "LinkedIn Marketing",
            duration: "13 min",
            preview: false,
          },
          {
            id: 12,
            title: "YouTube Marketing",
            duration: "10 min",
            preview: false,
          },
        ],
      },
      {
        id: 4,
        title: "Content Creation Strategies",
        description:
          "Learn effective content creation strategies for digital marketing campaigns.",
        videos: 4,
        duration: "50 minutes",
        lessons: [
          {
            id: 13,
            title: "Content Planning",
            duration: "12 min",
            preview: false,
          },
          {
            id: 14,
            title: "Visual Content Creation",
            duration: "15 min",
            preview: false,
          },
          {
            id: 15,
            title: "Written Content",
            duration: "13 min",
            preview: false,
          },
          { id: 16, title: "Module Quiz", duration: "10 min", preview: false },
        ],
      },
      {
        id: 5,
        title: "Social Media Advertising",
        description:
          "Learn how to create and manage effective social media advertising campaigns.",
        videos: 6,
        duration: "75 minutes",
        lessons: [
          { id: 17, title: "Facebook Ads", duration: "15 min", preview: false },
          {
            id: 18,
            title: "Instagram Ads",
            duration: "12 min",
            preview: false,
          },
          { id: 19, title: "Google Ads", duration: "18 min", preview: false },
          {
            id: 20,
            title: "Budget Management",
            duration: "10 min",
            preview: false,
          },
          {
            id: 21,
            title: "Ad Performance Tracking",
            duration: "12 min",
            preview: false,
          },
          { id: 22, title: "Module Quiz", duration: "8 min", preview: false },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Alex Chen",
        rating: 5,
        comment:
          "Excellent course! The content is well-structured and easy to follow. I learned so much about digital marketing.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Maria Rodriguez",
        rating: 4,
        comment:
          "Great introduction to digital marketing. The instructor explains complex concepts in simple terms.",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "David Kim",
        rating: 5,
        comment:
          "Perfect for beginners. The practical examples and case studies really help understand the concepts.",
        date: "3 weeks ago",
      },
    ],
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await getCourseDetails(params.id);
        const courseData = response.data || response;

        // Transform API data to match component expectations
        const transformedData = {
          id: courseData.id || params.id,
          title: courseData.title || courseData.name || "Course Title",
          description:
            courseData.description ||
            courseData.short_description ||
            "Course description not available.",
          rating: courseData.rating || courseData.average_rating || 4.0,
          totalLearners:
            courseData.total_learners ||
            courseData.enrolled_learners ||
            courseData.enrolled_count ||
            0,
          totalReviews:
            courseData.total_reviews || courseData.reviews_count || 0,
          trainingLevel:
            courseData.training_level || courseData.difficulty || "Beginner",
          lastUpdated: courseData.updated_at
            ? new Date(courseData.updated_at).toLocaleDateString()
            : "Recently",
          price: courseData.price || 0,
          originalPrice: courseData.original_price || courseData.price || 0,
          courseInfo: {
            timeToComplete: courseData.duration || "~6 hours",
            learningFormat: "Videos",
            modules: courseData.modules?.length
              ? `${courseData.modules.length} modules`
              : "10 modules",
            quizzes: courseData.quizzes_count
              ? `${courseData.quizzes_count} quiz`
              : "10 quiz",
            certificate: courseData.is_certificate ? "Yes" : "No",
            access: "Lifetime",
          },
          instructor: {
            name:
              courseData.instructor_name ||
              courseData.instructor?.name ||
              "Instructor",
            title: courseData.instructor_title || "Course Instructor",
            company: courseData.instructor_company || "TechUnlock",
            avatar: "👨‍💼",
          },
          learningObjectives:
            courseData.learning_objectives ||
            courseData.objectives ||
            mockCourseData.learningObjectives,
          skills:
            courseData.skills ||
            courseData.course_skills?.map((skill) => skill.name) ||
            mockCourseData.skills,
          modules: courseData.modules || mockCourseData.modules,
          reviews: courseData.reviews || mockCourseData.reviews,
        };

        setCourseDetails(transformedData);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details");
        showErrorToast("Failed to load course details");
        // Fallback to mock data if API fails
        setCourseDetails(mockCourseData);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourseDetails();
    }
  }, [params.id]);

  const tabs = [
    { id: "overview", name: "Overview", icon: BookOpen },
    { id: "curriculum", name: "Curriculum", icon: FileText },
    { id: "reviews", name: "Reviews", icon: Star },
  ];

  const handleEnroll = async () => {
    try {
      // Handle enrollment logic
      console.log("Enrolling in course:", params.id);

      if (courseDetails.price === 0) {
        // Free course - enroll directly
        const result = await enrollInCourse(params.id);
        showSuccessToast(result.message || "Successfully enrolled in course!");
        router.push(`/dashboard/courses/${params.id}/watch`);
      } else {
        // Paid course - navigate to payment page
        router.push(`/dashboard/courses/${params.id}/enroll`);
        showSuccessToast("Redirecting to enrollment page...");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      showErrorToast(error.message || "Failed to enroll in course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13485B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error && !courseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#13485B] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {courseDetails.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className=" gap-8">
          {/* Main Content */}
          <div className=" space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Course Image */}
                <div className="md:w-1/2 bg-[#13485B] flex items-center justify-center">
                  <Image
                    src={courseDetails.image}
                    alt={courseDetails.title}
                    width={500}
                    height={500}
                  />
                </div>

                {/* Course Info */}
                <div className="md:w-1/2 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {courseDetails.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-semibold text-gray-800">
                      {courseDetails.rating}
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(courseDetails.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({courseDetails.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>Training level: {courseDetails.trainingLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Updated {courseDetails.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {courseDetails.totalLearners} learners enrolled
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {courseDetails.price === 0 ? (
                      <div className="text-center">
                        <span className="text-3xl font-bold text-green-600">
                          Free
                        </span>
                        {courseDetails.originalPrice > 0 && (
                          <span className="text-lg text-gray-500 line-through ml-2">
                            ${courseDetails.originalPrice}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-800">
                          ${courseDetails.price}
                        </span>
                        {courseDetails.originalPrice > courseDetails.price && (
                          <span className="text-lg text-gray-500 line-through ml-2">
                            ${courseDetails.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enroll Button */}
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-[#13485B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {courseDetails.price === 0
                      ? "Enroll for Free"
                      : `Enroll Now - $${courseDetails.price}`}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-[#13485B]"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Course Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {courseDetails.description}
                      </p>
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {courseDetails.courseInfo.timeToComplete}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Video className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {courseDetails.courseInfo.learningFormat}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {courseDetails.courseInfo.modules}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {courseDetails.courseInfo.quizzes}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {courseDetails.courseInfo.certificate}
                        </span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">
                        Instructor
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                          {courseDetails.instructor.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {courseDetails.instructor.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {courseDetails.instructor.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {courseDetails.instructor.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* What you'll learn */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        What you'll learn
                      </h3>
                      <p className="text-gray-600 mb-6">
                        This comprehensive beginner course is designed to take
                        you step-by-step through the essentials of digital
                        marketing.
                      </p>

                      <div className="space-y-3">
                        {courseDetails.learningObjectives.map(
                          (objective, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700">{objective}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Skills you'll gain */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Skills you'll gain
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {courseDetails.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === "curriculum" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Course Content
                      </h3>
                      <span className="text-sm text-gray-600">
                        {courseDetails.modules.length} modules
                      </span>
                    </div>

                    {courseDetails.modules.map((module, moduleIndex) => (
                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Lock className="w-5 h-5 text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  Module {moduleIndex + 1}: {module.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {module.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                {module.videos} videos
                              </div>
                              <div className="text-sm text-gray-600">
                                {module.duration}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between py-2"
                              >
                                <div className="flex items-center space-x-3">
                                  {lesson.preview ? (
                                    <Play className="w-4 h-4 text-[#13485B]" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-sm text-gray-700">
                                    {lessonIndex + 1}. {lesson.title}
                                  </span>
                                  {lesson.preview && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      Preview
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Student Reviews
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-800">
                          {courseDetails.rating}
                        </span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(courseDetails.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({courseDetails.totalReviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {courseDetails.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">
                              {review.name}
                            </span>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {/* <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Course Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {courseDetails.courseInfo.timeToComplete}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">
                    {courseDetails.trainingLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modules</span>
                  <span className="font-medium">
                    {courseDetails.courseInfo.modules}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quizzes</span>
                  <span className="font-medium">
                    {courseDetails.courseInfo.quizzes}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">
                    {courseDetails.courseInfo.certificate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Access</span>
                  <span className="font-medium">
                    {courseDetails.courseInfo.access}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  {courseDetails.price === 0 ? (
                    <div>
                      <span className="text-3xl font-bold text-green-600">
                        Free
                      </span>
                      {courseDetails.originalPrice > 0 && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${courseDetails.originalPrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-gray-800">
                        ${courseDetails.price}
                      </span>
                      {courseDetails.originalPrice > courseDetails.price && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${courseDetails.originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleEnroll}
                  className="w-full bg-[#13485B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
                >
                  {courseDetails.price === 0
                    ? "Enroll for Free"
                    : `Enroll Now - $${courseDetails.price}`}
                </button>

                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
