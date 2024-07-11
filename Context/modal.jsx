"use client"
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(true);

  const contextValue = {
    modal,
    setModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};