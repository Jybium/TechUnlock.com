"use client"

import React, { ReactNode } from "react";

class NotFoundBoundary extends React.Component{
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in NotFoundBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Ensure error message is a string before rendering
      const errorMessage = this.state.error
        ? this.state.error.message
        : "An error occurred";
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NotFoundBoundary;
