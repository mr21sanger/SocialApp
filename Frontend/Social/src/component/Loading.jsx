import React from "react";
import "../css/style.css"
function Loading() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center fixed bg-black bg-opacity-30 backdrop-blur-[3px] inset-0">
        <div className="loader11"></div>
      </div>
    </>
  );
}

export default Loading;
