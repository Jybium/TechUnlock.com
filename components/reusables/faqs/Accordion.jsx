"use client";

import React, { useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Accordion = memo(({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} item={item} />
      ))}
    </div>
  );
});

const AccordionItem = memo(({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded bg-pri1 shadow">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between gap-y-4  items-center px-4 py-3 focus:outline-none text-sm"
        aria-expanded={isOpen}
      >
        <span className="text-base text-left font-medium text-pri10">
          {item.question}
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
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Accordion;
