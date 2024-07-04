import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import ImageUploader from "./ImageUploader";
import { useProfileContext } from "../Reducer/profileReducer";
import { usePostContext } from "../Reducer/postReducer";

function CreatePostCont({ onClose }) {
  const [photo, setPhoto] = useState(true);
  const [note, setNote] = useState(false);
  const { posted } = usePostContext();

  const postNote = () => {
    setPhoto(false);
    setNote(true);
  };
  const postPhoto = () => {
    setPhoto(true);
    setNote(false);
  };

  if (posted) {
    onClose();
  }
  return (
    <>
      <div className="w-full h-[30em] z-0 overflow-x-hidden overflow-hidden relative -top-3.5  ">
        <div className="w-[80%] mx-auto border-b-2 h-[3em]  flex gap-2">
          <button
            className={`w-full text-xl font-bold ${
              photo ? "border-b-4 border-black" : "font-medium"
            }`}
            onClick={postPhoto}
          >
            Photo
          </button>

          <button
            className={`w-full text-xl font-bold ${
              note ? "border-b-4 border-black" : "font-medium"
            }`}
            onClick={postNote}
          >
            Note
          </button>
        </div>

        <div className="w-full h-auto flex justify-center items-center relative">
          <div
            className={`w-[100%] h-[28em] bg-re-500 transition-all duration-300 absolute top-0 ${
              photo ? "translate-x-0" : " -translate-x-full opacity- "
            }`}
          >
            <ImageUploader />
          </div>
          <div
            className={` w-[100%] h-[25em] flex items-center transition-all duration-300 ${
              note ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <CreatePost />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostCont;
