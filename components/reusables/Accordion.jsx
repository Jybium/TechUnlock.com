"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="border border-pri10 rounded">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center px-4 py-3 focus:outline-none text-sm"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium">
          Module {index + 1}: {item.title}
        </span>
        <span className="text-lg">{isOpen ? "-" : "+"}</span>
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
              {item?.description || item?.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Accordion;
