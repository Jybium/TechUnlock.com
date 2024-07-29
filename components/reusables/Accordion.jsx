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

  // Function to parse HTML content and return JSX elements
  const parseContent = (content) => {
    if (!content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const lists = Array.from(doc.querySelectorAll("ul"));
    const paragraphs = Array.from(doc.querySelectorAll("p"));

    return (
      <>
        {lists.map((list, listIndex) => (
          <ul key={listIndex} className="list-disc ml-6">
            {Array.from(list.children).map((li, liIndex) => (
              <li key={liIndex}>{li.textContent}</li>
            ))}
          </ul>
        ))}
        {paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} className="ml-6">
            {paragraph.textContent}
          </p>
        ))}
      </>
    );
  };

  const parsedContent = parseContent(item?.description || item?.content);

  return (
    <div className="border border-pri10 rounded">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center px-4 py-3 focus:outline-none text-sm"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-left">
          Module {index + 1}: {item.title}
        </span>
        <span className="text-sm h-8 w-8 hover:bg-primary hover:text-white rounded-full flex items-center justify-center border border-primary">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
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
              {parsedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Accordion;
