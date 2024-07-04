import React, { useState } from "react";
import PostsProfile from "./PostsProfile";
import PostSection from "./PostSection";

function Posts({ data, className = "posts" }) {
  return (
    <>
      <div
        className={`w-[37vw] mx-auto h-auto transition-all duration-300 border border-black border-opacity-35 mx-aut my-2 bg-gray-50 rounded-lg  py-3 ${className}`}
      >
        <PostsProfile data={data} />
        <PostSection data={data} />
      </div>
    </>
  );
}

export default Posts;
