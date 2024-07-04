import React from "react";

function Box3({ children, className = "w-[21vw] h-[52vh]" }) {
  return (
    <div className= {`m-2 bg-gray-50 border border-gray-700 rounded-2xl none ${className}`}>
      {children}
    </div>
  );
}

export default Box3;
