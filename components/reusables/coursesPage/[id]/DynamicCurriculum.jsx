"use client";

import React, { useState, useRef, useEffect } from "react";

const items = [
  { id: 1, title: "Item 1", content: "Content for item 1." },
  { id: 2, title: "Item 2", content: "Content for item 2." },
  { id: 3, title: "Item 3", content: "Content for item 3." },
  { id: 4, title: "Item 4", content: "Content for item 4." },
  { id: 5, title: "Item 5", content: "Content for item 5." },
  { id: 6, title: "Item 6", content: "Content for item 6." },
  { id: 7, title: "Item 7", content: "Content for item 7." },
  { id: 8, title: "Item 8", content: "Content for item 8." },
  { id: 9, title: "Item 9", content: "Content for item 9." },
  { id: 10, title: "Item 10", content: "Content for item 10." },
];

const DynamicCard = ({ course }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [scrollProgress, setScrollProgress] = useState(40); // Initial scrollbar height at 40%
  const itemsContainerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const isDraggingRef = useRef(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleScroll = () => {
    const itemsContainer = itemsContainerRef.current;
    const scrollTop = itemsContainer.scrollTop;
    const scrollHeight =
      itemsContainer.scrollHeight - itemsContainer.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
    updateScrollbar(progress);
  };

  const handleDragStart = (e) => {
    isDraggingRef.current = true;
    e.preventDefault();
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;

    const itemsContainer = itemsContainerRef.current;
    const containerHeight = itemsContainer.clientHeight;
    const scrollHeight = itemsContainer.scrollHeight - containerHeight;
    const mouseY = e.clientY - itemsContainer.getBoundingClientRect().top;
    let scrollPosition = (mouseY / containerHeight) * scrollHeight;

    // Ensure scroll position does not go below 0
    scrollPosition = Math.max(0, scrollPosition);

    itemsContainer.scrollTo({
      top: scrollPosition,
      behavior: "auto",
    });

    const progress = (scrollPosition / scrollHeight) * 100;
    setScrollProgress(progress);

    e.preventDefault();
  };

  useEffect(() => {
    const itemsContainer = itemsContainerRef.current;

    // Set initial scrollbar height
    updateScrollbar(scrollProgress);

    itemsContainer.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      itemsContainer.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, []);

  const updateScrollbar = (progress) => {
    const scrollbar = scrollbarRef.current;

    if (scrollbar) {
      // Ensure scrollbar height does not go below 10%
      const height = Math.max(progress, 50);
      scrollbar.style.height = `${height}%`;

      // Change background color based on progress
      if (progress > 0) {
        scrollbar.classList.add("bg-pri10");
        scrollbar.classList.remove("bg-gray-200");
      } else {
        scrollbar.classList.remove("bg-pri10");
        scrollbar.classList.add("bg-gray-200");
      }
    }
  };

  return (
    <div className="flex flex-row-reverse h-[60vh] overflow-hidden">
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="transition-transform duration-500 ease-in-out transform hover:scale-105 bg-white shadow-lg rounded-lg p-6 h-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
          <p className="text-lg">{selectedItem.content}</p>
        </div>
      </div>
      <div className="w-1/2 px-8 bg-transparent relative">
        <div
          ref={itemsContainerRef}
          className="max-h-full overflow-y-auto scrollbar-hide"
          onMouseDown={handleDragStart}
        >
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="mb-4 p-4 bg-white shadow-md rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500 hover:text-white"
                onClick={() => handleItemClick(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-200 w-3 h-full">
          <div
            ref={scrollbarRef}
            className="absolute top-0 right-0 h-full w-3 cursor-pointer"
            style={{ height: `${scrollProgress}%` }}
            onMouseDown={handleDragStart}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
