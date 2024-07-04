import React from "react";

function Topbar() {
  return (
    <div className="md:hidden bg-gray-50 h-[5.5em] border-b-2 border-gray-500 border-opacity-25 flex items-center justify-between px-3">
      <img src="/logo.png" alt="" className="h-[2.5em] -skew-x-12" />
      {/* <button className="flex justify-center items-center gap-1 text-xl border-gray-700 border-opacity-35 rounded-lg border px-2.5 py-1.5 ">
        <span className="font-2xl">{search}</span> Search
      </button> */}
    </div>
  );
}

export default Topbar;
