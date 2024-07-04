import React, { useRef, useState } from "react";
import { close } from "../icons";
import SignupForm from "../component/SignupForm";

function Modal({
  onClose,
  element,
  className = "h-[80vh] w-[30vw]",
  modalClassName = "",
}) {
  const modalRef = useRef();

  const closeSignup = (e) => {
    if (modalRef.current == e.target) [onClose()];
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={closeSignup}
        className={`bg-black inset-0 z-50 fixed bg-opacity-30 backdrop-b flex justify-center items-center ${modalClassName}`}
      >
        <div
          className={`signUp bg-gray-50 border border-gray-700 border-opacity-35 rounded-lg ${className}`}
        >
          <button
            className="text-4xl float-right z-50 my-2 mx-2 bgblack"
            onClick={onClose}
          >
            {close}
          </button>
          {element}
        </div>
      </div>
    </>
  );
}

export default Modal;
