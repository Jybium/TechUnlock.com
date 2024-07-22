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

  // Function to convert HTML string into array of list items
  const parseContent = (content) => {
    if (!content) return [];
    return content
      .split("</p>")
      .map((item) => item.replace("<p>• ", "").trim())
      .filter((item) => item !== "");
  };

  const listItems = parseContent(item?.description || item?.content);

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
              <ul className="list-disc ml-6">
                {listItems.map((listItem, idx) => (
                  <li key={idx}>{listItem}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Accordion;
