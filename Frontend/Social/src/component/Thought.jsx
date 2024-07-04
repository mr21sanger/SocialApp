import React, { useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";
import Modal from "./Modal";
import CreatePost from "./CreatePost";

function Thought() {
  const [postBlock, setPostBlock] = useState(false);

  const handleClick = () => {
    setPostBlock(!postBlock);
  };
  const { user } = useProfileContext();

  return (
    <>
      <div className="w-full h-full flex items-center justify-center px-2.5 border-b border-gray-900 border-opacity-25 gap-2 thought">
        {/* PFP IMAGE SECTION */}
        <div
          className={`w-[5vw] h-[10.8vh] rounded-full bg-black  flex items-center justify-center`}
        >
          <img
            src={user?.pfp}
            alt="pfp"
            className={`w-[4.8vw] h-[10.4vh] rounded-full object-cover`}
          />
        </div>
        <button
          className="w-[35vw] h-[3em] rounded-full border-2 border-gray-600 border-opacity-20 font-medium text-xl text-pretty"
          onClick={() => handleClick()}
        >
          Hey {user?.firstName}, What's Going on?
        </button>
        {postBlock && (
          <Modal
            onClose={() => setPostBlock(false)}
            element={<CreatePost onClose={() => setPostBlock(false)} />}
            className="h-[60vh] w-[40vw] postModalContainer"
            modalClassName="postModal"
          ></Modal>
        )}
      </div>
    </>
  );
}

export default Thought;
