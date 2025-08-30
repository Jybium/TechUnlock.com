"use client";

import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`${entry.name}: ${entry.value}`);

        // Send to analytics service (replace with your analytics)
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", entry.name, {
            value: Math.round(entry.value),
            event_category: "Web Vitals",
          });
        }
      }
    });

    // Observe different types of performance entries
    observer.observe({ entryTypes: ["navigation", "resource", "paint"] });

    // Monitor LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // Monitor FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("FID:", entry.processingStart - entry.startTime);
      }
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // Monitor CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log("CLS:", clsValue);
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
