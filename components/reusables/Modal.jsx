"use client";
import { useModal } from "@/Context/modal";
import React from "react";

const Modal = ({ children }) => {
  const { modal, setModal } = useModal();

  const HandleModalClick = () => {
    setModal(false);
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-40 ">
          <div
            className="fixed inset-0 flex h-auto bg-black/20 backdrop-blur-lg "
            onClick={HandleModalClick}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-[90%] min-h-max lg:w-2/3 lg:max-w-xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
