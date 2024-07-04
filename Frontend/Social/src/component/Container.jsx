import React from "react";

function Container({ children }) {
  return <div className="w-[100vw] h-full overflow-x-hidden">{children}</div>;
} 

export default Container;
