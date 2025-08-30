"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle,
  Lock,
  Users,
  MessageCircle,
  Award,
  Clock,
  PlayCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getCourseDetails,
  completeCourseModule,
  submitQuiz as submitQuizApi,
} from "@/services/course";
import Link from "next/link";

const CourseDetailsPage = ({ courseId }) => {
  const [courseData, setCourseData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedItems, setCompletedItems] = useState(new Set());
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showModuleCompletion, setShowModuleCompletion] = useState(false);
  const [showCourseCompletion, setShowCourseCompletion] = useState(false);
  const [showBadgeEarned, setShowBadgeEarned] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [experienceRating, setExperienceRating] = useState(0);
  const router = useRouter();

  const fetchCourseData = async (id) => {
    try {
      const data = await getCourseDetails(id);
      return data;

      console.log(data);
    } catch (error) {
      return null;
    }
  };

  // Parse URL parameters
  const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      moduleId: params.get("module") ? parseInt(params.get("module")) : null,
      videoId: params.get("video") ? parseInt(params.get("video")) : null,
      quizId: params.get("quiz") ? parseInt(params.get("quiz")) : null,
      completed: params.get("completed")
        ? params.get("completed").split(",").filter(Boolean)
        : [],
      expanded: params.get("expanded")
        ? params
            .get("expanded")
            .split(",")
            .map((id) => parseInt(id))
            .filter(Boolean)
        : [],
    };
  };

  // Update URL with current state
  const updateUrl = useCallback((updates = {}) => {
    const params = new URLSearchParams(window.location.search);

    if (updates.moduleId !== undefined) {
      if (updates.moduleId) params.set("module", updates.moduleId.toString());
      else params.delete("module");
    }

    if (updates.videoId !== undefined) {
      if (updates.videoId) params.set("video", updates.videoId.toString());
      else params.delete("video");
    }

    if (updates.quizId !== undefined) {
      if (updates.quizId) params.set("quiz", updates.quizId.toString());
      else params.delete("quiz");
    }

    if (updates.completed !== undefined) {
      if (updates.completed.length > 0)
        params.set("completed", updates.completed.join(","));
      else params.delete("completed");
    }

    if (updates.expanded !== undefined) {
      if (updates.expanded.length > 0)
        params.set("expanded", updates.expanded.join(","));
      else params.delete("expanded");
    }

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, []);

  // Check if all videos in a module are completed and unlock next module
  const checkAndUnlockNextModule = useCallback((completedSet, courseData) => {
    if (!courseData) return courseData;

    const updatedModules = courseData.modules.map((module, index) => {
      // Check if all videos in current module are completed
      const allVideosCompleted = module.videos.every((video) =>
        completedSet.has(`video-${video.id}`)
      );

      // If current module videos are all completed, unlock next module
      if (allVideosCompleted && index < courseData.modules.length - 1) {
        const nextModule = courseData.modules[index + 1];
        if (nextModule.is_locked) {
          return module;
        }
      }

      return module;
    });

    // Update modules to unlock next ones
    const finalModules = updatedModules.map((module, index) => {
      if (index === 0) return { ...module, is_locked: false }; // First module always unlocked

      const prevModule = updatedModules[index - 1];
      const prevModuleCompleted = prevModule.videos.every((video) =>
        completedSet.has(`video-${video.id}`)
      );

      return {
        ...module,
        is_locked: !prevModuleCompleted,
      };
    });

    return {
      ...courseData,
      modules: finalModules,
    };
  }, []);

  useEffect(() => {
    async function init() {
      const searchParams = new URLSearchParams(window.location.search);
      const id = courseId || searchParams.get("id");
      if (!id) return;

      const urlParams = parseUrlParams();
      const data = await fetchCourseData(id);
      if (!data) return;

      const completedSet = new Set(urlParams.completed);
      const updatedData = checkAndUnlockNextModule(completedSet, data);
      setCourseData(updatedData);
      setCompletedItems(completedSet);

      const expandedObj = {};
      if (urlParams.expanded.length > 0) {
        urlParams.expanded.forEach((eid) => (expandedObj[eid] = true));
      } else if (updatedData?.modules?.[0]) {
        expandedObj[updatedData.modules[0].id] = true;
      }
      setExpandedModules(expandedObj);

      let targetModule = updatedData?.modules?.[0];
      let targetVideo = targetModule?.videos?.[0];

      if (urlParams.moduleId) {
        const foundModule = updatedData.modules.find(
          (m) => m.id === urlParams.moduleId
        );
        if (foundModule && !foundModule.is_locked) {
          targetModule = foundModule;

          if (urlParams.videoId) {
            const foundVideo = foundModule.videos.find(
              (v) => v.id === urlParams.videoId
            );
            if (foundVideo) {
              targetVideo = foundVideo;
            }
          } else if (urlParams.quizId) {
            const foundQuiz = foundModule.quizzes.find(
              (q) => q.id === urlParams.quizId
            );
            if (foundQuiz) {
              setCurrentQuiz(foundQuiz);
              targetVideo = null;
            }
          }
        }
      }

      setSelectedModule(targetModule || null);
      setSelectedVideo(targetVideo || null);
    }

    init();
  }, [courseId, checkAndUnlockNextModule]);

  // Update URL when state changes
  useEffect(() => {
    if (!courseData || !selectedModule) return;

    const completedArray = Array.from(completedItems);
    const expandedArray = Object.keys(expandedModules)
      .filter((key) => expandedModules[key])
      .map(Number);

    updateUrl({
      moduleId: selectedModule.id,
      videoId: selectedVideo?.id || null,
      quizId: currentQuiz?.id || null,
      completed: completedArray,
      expanded: expandedArray,
    });
  }, [
    selectedModule,
    selectedVideo,
    currentQuiz,
    completedItems,
    expandedModules,
    updateUrl,
    courseData,
  ]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const selectVideo = (video, module) => {
    if (!module.is_locked) {
      setSelectedVideo(video);
      setSelectedModule(module);
      setCurrentQuiz(null);
    }
  };

  const selectQuiz = (quiz, module) => {
    if (!module.is_locked) {
      setCurrentQuiz(quiz);
      setSelectedVideo(null);
      setQuizAnswers({});
      setShowQuizResults(false);
    }
  };

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitQuiz = async () => {
    if (!selectedModule || !currentQuiz) return;
    try {
      await submitQuizApi();
    } catch {}
    const score = selectedModule.quizzes.filter(
      (quiz) => quizAnswers[quiz.id] === quiz.correct_answer
    ).length;
    setQuizScore(score);
    setShowQuizResults(true);
  };

  const completeQuiz = async () => {
    if (!currentQuiz) return;
    try {
      await completeCourseModule(selectedModule?.id);
    } catch {}
    markComplete(`quiz-${currentQuiz.id}`);
    setShowQuizResults(false);
    setCurrentQuiz(null);
    checkModuleCompletion();
  };

  const checkModuleCompletion = () => {
    if (!selectedModule) return;

    const allVideosCompleted = selectedModule.videos.every((video) =>
      completedItems.has(`video-${video.id}`)
    );
    const allQuizzesCompleted = selectedModule.quizzes.every((quiz) =>
      completedItems.has(`quiz-${quiz.id}`)
    );

    if (allVideosCompleted && allQuizzesCompleted) {
      setShowModuleCompletion(true);

      const allModulesCompleted = courseData.modules.every((module) => {
        const moduleVideosCompleted = module.videos.every((video) =>
          completedItems.has(`video-${video.id}`)
        );
        const moduleQuizzesCompleted = module.quizzes.every((quiz) =>
          completedItems.has(`quiz-${quiz.id}`)
        );
        return moduleVideosCompleted && moduleQuizzesCompleted;
      });

      if (allModulesCompleted) {
        setTimeout(() => {
          setShowModuleCompletion(false);
          setShowCourseCompletion(true);
        }, 2000);
      }
    }
  };

  const submitModuleFeedback = () => {
    setShowModuleCompletion(false);
    setFeedbackText("");

    // Check if this was the last module
    const allModulesCompleted = courseData.modules.every((module) => {
      const moduleVideosCompleted = module.videos.every((video) =>
        completedItems.has(`video-${video.id}`)
      );
      const moduleQuizzesCompleted = module.quizzes.every((quiz) =>
        completedItems.has(`quiz-${quiz.id}`)
      );
      return moduleVideosCompleted && moduleQuizzesCompleted;
    });

    if (allModulesCompleted) {
      setShowCourseCompletion(true);
    }
  };

  const submitCourseFeedback = () => {
    setShowCourseCompletion(false);
    setShowBadgeEarned(true);
    setFeedbackText("");
    setExperienceRating(0);
  };

  const handleJoinCommunity = () => {
    setShowCommunityModal(true);
  };

  const closeCommunityModal = () => {
    setShowCommunityModal(false);
  };

  const markComplete = (itemId) => {
    const newCompletedItems = new Set([...completedItems, itemId]);
    setCompletedItems(newCompletedItems);

    // Check if this completion unlocks the next module
    const updatedCourseData = checkAndUnlockNextModule(
      newCompletedItems,
      courseData
    );
    if (JSON.stringify(updatedCourseData) !== JSON.stringify(courseData)) {
      setCourseData(updatedCourseData);
    }
  };

  const calculateProgress = () => {
    if (!courseData) return 0;
    const totalItems = courseData.modules.reduce(
      (acc, module) => acc + module.videos.length + module.quizzes.length,
      0
    );
    return Math.round((completedItems.size / totalItems) * 100);
  };

  if (!courseData) return <div>Loading...</div>;

  return (
    <div className="">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </button>
      <div className="flex h-screen bg-gray-50 gap-x-4">
        {/* Sidebar */}

        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-bold text-lg text-gray-800">
                  {courseData.title}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Course modules & topics
                </p>
              </div>
              {/* Progress */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="relative w-10 h-10 rounded-full"
                  style={{
                    background: `conic-gradient(#268FB6 ${Math.max(
                      0,
                      Math.min(
                        100,
                        Number(courseData?.progress_percentage ?? 0)
                      )
                    )}%, #e5e7eb 0 100%)`,
                  }}
                >
                  <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-[10px] font-semibold text-gray-700">
                    {`${Math.max(
                      0,
                      Math.min(
                        100,
                        Number(courseData?.progress_percentage ?? 0)
                      )
                    )}%`}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 mt-1">
                  {courseData?.total_modules ??
                    courseData?.modules?.length ??
                    0}{" "}
                  Modules
                </span>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="flex-1 overflow-y-auto">
            {courseData.modules.map((module) => (
              <div key={module.id} className="border-b border-gray-100">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      {module.is_locked ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-[#13485B]">
                            {module.order}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transform transition-transform ${
                      expandedModules[module.id] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedModules[module.id] && (
                  <div className="bg-gray-50">
                    {/* Videos */}
                    {module.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => selectVideo(video, module)}
                        disabled={module.is_locked}
                        className={`w-full px-8 py-2 flex items-center text-left hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                          selectedVideo?.id === video.id
                            ? "bg-blue-50 border-r-2 border-[#13485B]"
                            : ""
                        }`}
                      >
                        <div className="w-8 h-6 bg-pri10 rounded mr-3 flex items-center justify-center">
                          <Play className="w-3 h-3 text-white fill-current" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {video.duration}
                          </p>
                        </div>
                        {completedItems.has(`video-${video.id}`) && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                        )}
                      </button>
                    ))}

                    {/* Module Summary */}
                    {module.summaries.map((summary) => (
                      <div
                        key={summary.id}
                        className="px-8 py-2 flex items-center"
                      >
                        <div className="w-4 h-4 bg-gray-300 rounded mr-3 flex items-center justify-center">
                          <span className="text-xs text-gray-600">📝</span>
                        </div>
                        <p className="text-sm text-gray-600">Module Summary</p>
                      </div>
                    ))}

                    {/* Quizzes */}
                    {module.quizzes.map((quiz) => (
                      <button
                        key={quiz.id}
                        onClick={() => selectQuiz(quiz, module)}
                        disabled={module.is_locked}
                        className={`w-full px-8 py-2 flex items-center text-left hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                          currentQuiz?.id === quiz.id
                            ? "bg-blue-50 border-r-2 border-[#13485B]"
                            : ""
                        }`}
                      >
                        <div className="w-4 h-4 bg-orange-500 rounded mr-3 flex items-center justify-center">
                          <span className="text-xs text-white">?</span>
                        </div>
                        <p className="text-sm text-gray-600">Module Quiz</p>
                        {completedItems.has(`quiz-${quiz.id}`) && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <Link
              href={courseData?.community_link_detail?.link}
              className="w-full flex items-center text-[#13485B] hover:text-blue-700 text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Join {courseData?.community_link_detail?.description} Community
            </Link>
            <button className="w-full flex items-center text-[#13485B] hover:text-blue-700 text-sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Give Feedback
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedVideo && (
            <>
              {/* Video Player */}
              <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 border border-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative aspect-video h-48 flex items-center justify-center">
                  <div className="text-center">
                    <video
                      src={`https://youtu.be/Uc8MCfbjcnE?si=6MceuAXVpaFr99pq`}
                      controls
                      autoPlay
                      className="h-full w-full"
                    />
                  </div>

                  {/* Floating Elements */}
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span className="text-sm">00:00</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-white bg-opacity-30 rounded-full">
                      <div className="h-1 bg-white rounded-full w-0"></div>
                    </div>
                  </div>
                  <span className="text-sm">{selectedVideo.duration}</span>
                </div>
              </div>

              {/* Video Title */}
              <div className="px-6 py-4 bg-white border-b">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                  {selectedVideo.title}
                </h3>
              </div>

              {/* Module overview and videos list */}
              <div className="p-6 bg-white">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Module Overview
                    </h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      {selectedModule?.description && (
                        <p>{selectedModule.description}</p>
                      )}
                      {Array.isArray(selectedModule?.summaries) &&
                        selectedModule.summaries.map((s) => (
                          <p key={s.id}>{s.text}</p>
                        ))}
                      {!selectedModule?.description &&
                        selectedVideo?.description && (
                          <p>{selectedVideo.description}</p>
                        )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {selectedModule?.videos?.length || 0} Course Videos
                    </h4>
                    <div className="space-y-2">
                      {selectedModule?.videos?.map((video) => (
                        <div
                          key={video.id}
                          className={`flex items-center p-3 rounded-lg border ${
                            selectedVideo?.id === video.id
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="w-12 h-8 bg-pri10 rounded flex items-center justify-center mr-3">
                            <PlayCircle className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <button
                              className="text-left w-full"
                              onClick={() => selectVideo(video, selectedModule)}
                            >
                              <p className="font-medium text-gray-800">
                                {video.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {video.duration}
                              </p>
                            </button>
                          </div>
                          {!selectedModule.is_locked && (
                            <button
                              onClick={() => markComplete(`video-${video.id}`)}
                              className={`ml-2 ${
                                completedItems.has(`video-${video.id}`)
                                  ? "text-green-500"
                                  : "text-gray-400 hover:text-green-500"
                              }`}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentQuiz && (
            <div className="p-6 bg-white flex-1">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Quiz Test
                    </h2>
                    <p className="text-gray-600">{selectedModule.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-[#13485B] font-bold">
                        {quizScore}/{selectedModule.quizzes.length}
                      </span>
                    </div>
                  </div>
                </div>

                {!showQuizResults ? (
                  <div className="space-y-6">
                    {selectedModule.quizzes.map((quiz, index) => (
                      <div
                        key={quiz.id}
                        className="p-6 border border-gray-200 rounded-lg"
                      >
                        <h3 className="font-semibold text-gray-800 mb-4">
                          {index + 1}. {quiz.question}
                        </h3>
                        <div className="space-y-3">
                          {["option_a", "option_b", "option_c", "option_d"].map(
                            (option) => (
                              <label
                                key={option}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                  quizAnswers[quiz.id] ===
                                  option.slice(-1).toUpperCase()
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${quiz.id}`}
                                  value={option.slice(-1).toUpperCase()}
                                  checked={
                                    quizAnswers[quiz.id] ===
                                    option.slice(-1).toUpperCase()
                                  }
                                  onChange={(e) =>
                                    handleQuizAnswer(quiz.id, e.target.value)
                                  }
                                  className="mr-3"
                                />
                                <span className="flex-1">{quiz[option]}</span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <button
                        onClick={submitQuiz}
                        disabled={
                          Object.keys(quizAnswers).length !==
                          selectedModule.quizzes.length
                        }
                        className="px-6 py-2 bg-pri10 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        Submit Answers
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedModule.quizzes.map((quiz, index) => (
                      <div
                        key={quiz.id}
                        className="p-6 border border-gray-200 rounded-lg"
                      >
                        <h3 className="font-semibold text-gray-800 mb-4">
                          {index + 1}. {quiz.question}
                        </h3>
                        <div className="space-y-3">
                          {["option_a", "option_b", "option_c", "option_d"].map(
                            (option) => {
                              const isCorrect =
                                quiz.correct_answer ===
                                option.slice(-1).toUpperCase();
                              const isSelected =
                                quizAnswers[quiz.id] ===
                                option.slice(-1).toUpperCase();
                              const isWrongSelection = isSelected && !isCorrect;

                              return (
                                <div
                                  key={option}
                                  className={`flex items-center p-3 border rounded-lg ${
                                    isCorrect
                                      ? "border-green-500 bg-green-50"
                                      : isWrongSelection
                                      ? "border-red-500 bg-red-50"
                                      : "border-gray-200 bg-gray-50"
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                                      isCorrect
                                        ? "bg-green-500"
                                        : isWrongSelection
                                        ? "bg-red-500"
                                        : "bg-gray-300"
                                    }`}
                                  >
                                    {isCorrect && (
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="flex-1">{quiz[option]}</span>
                                  {isCorrect && (
                                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-[#13485B]">
                          {quizScore}/{selectedModule.quizzes.length}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Quiz Completed!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You scored {quizScore} out of{" "}
                        {selectedModule.quizzes.length}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={completeQuiz}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        >
                          Continue
                        </button>
                        <button
                          onClick={() => setShowQuizResults(false)}
                          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
                        >
                          Review Answers
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
