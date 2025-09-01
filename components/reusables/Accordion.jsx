"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = memo(({ items }) => {
  return (
    <div className="space-y-4">
      {items?.map((item, index) => (
        <AccordionItem key={index} index={index} item={item} />
      ))}
    </div>
  );
});

const AccordionItem = memo(({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Function to render module content in Udemy style
  const renderModuleContent = (module) => {
    if (!module) return null;

    return (
      <div className="space-y-0">
        {/* Module Description */}
        {module.description && (
          <div className="px-4 py-3 border-b border-gray-100">
            <div
              className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: module.description }}
            />
          </div>
        )}

        {/* Videos Section - Udemy Style */}
        {module.videos && module.videos.length > 0 && (
          <div>
            {module.videos.map((video, videoIndex) => (
              <div
                key={video.id || videoIndex}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {/* Video Icon */}
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900 truncate">
                      {video.title}
                    </h5>
                    {video.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-2 ml-4">
                  {video.duration && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {video.duration}
                    </span>
                  )}
                  {/* Preview indicator */}
                  <span className="text-xs text-blue-600 font-medium">
                    Preview
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summaries Section - Udemy Style */}
        {module.summaries && module.summaries.length > 0 && (
          <div>
            {module.summaries.map((summary, summaryIndex) => (
              <div
                key={summary.id || summaryIndex}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {/* Summary Icon */}
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Summary Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900">
                      Summary
                    </h5>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {summary.text}
                    </p>
                  </div>
                </div>

                {/* Summary indicator */}
                <span className="text-xs text-gray-500 font-medium">
                  Reading
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Section - Udemy Style */}

        {/* Module Stats - Udemy Style */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              {module.duration && <span>{module.duration}</span>}
              {module.video_count > 0 && (
                <span>
                  {module.video_count} lecture
                  {module.video_count > 1 ? "s" : ""}
                </span>
              )}
              {module.quizzes && module.quizzes.length > 0 && (
                <span>
                  {module.quizzes.length} quiz
                  {module.quizzes.length > 1 ? "zes" : ""}
                </span>
              )}
            </div>
            {module.is_locked !== undefined && (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  module.is_locked
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {module.is_locked ? "Locked" : "Unlocked"}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const moduleContent = renderModuleContent(item);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center px-4 py-4 focus:outline-none hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          {/* Module Number */}
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">
              {index + 1}
            </span>
          </div>

          {/* Module Title and Info */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              {item.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
              {item.video_count > 0 && (
                <span>
                  {item.video_count} lecture{item.video_count > 1 ? "s" : ""}
                </span>
              )}
              {item.duration && <span>{item.duration}</span>}
              {item.quizzes && item.quizzes.length > 0 && (
                <span>
                  {item.quizzes.length} quiz
                  {item.quizzes.length > 1 ? "zes" : ""}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex items-center space-x-2">
          {item.is_locked && (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="w-6 h-6 flex items-center justify-center">
            {isOpen ? (
              <IoIosArrowUp className="w-5 h-5 text-gray-500" />
            ) : (
              <IoIosArrowDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: contentRef.current
                ? contentRef.current.scrollHeight
                : "auto",
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="p-4 text-sm">
              {moduleContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Accordion;
