import { useEffect, useRef, useState, useCallback } from "react";

const useIntersectionObserver = (options = {}) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  };

  const handleIntersection = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        setIsVisible(true);
        // Unobserve after first intersection for performance
        if (options.unobserveOnIntersect !== false) {
          observer.unobserve(entry.target);
        }
      } else {
        setIsVisible(false);
      }
    },
    [options.unobserveOnIntersect]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      defaultOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleIntersection, defaultOptions]);

  return [ref, hasIntersected, isVisible];
};

export default useIntersectionObserver;
