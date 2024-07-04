import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

function AllMessage({ messages, index }) {
  const userId = localStorage.getItem("id");

  return (
    <>
      <ScrollableFeed forceScroll={true}>
        {messages?.map((message, i) => {
          const isUserMessage = message?.senderId._id === userId;
          return (
            <div
              className={`flex gap-2 items-center ${
                isUserMessage ? "justify-end " : ""
              }`}
            >
              <p
                className={`px-4 py-1 rounded-3xl max-w-[15em] text-xl my-0.5 
                  text-wrap overflow-hidden w-auto border break-words  ${
                    message?.senderId._id == userId
                      ? "bg-gray-300 text-black"
                      : "bg-black text-white"
                  }`}
              >
                {message?.content}
              </p>
            </div>
          );
        })}
      </ScrollableFeed>
    </>
  );
}

export default AllMessage;
