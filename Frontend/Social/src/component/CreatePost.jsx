import React, { useState } from "react";
import { usePostContext } from "../Reducer/postReducer";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../Reducer/profileReducer";

function CreatePost({ onClose }) {
  const id = localStorage.getItem("id");
  const { createPost, posted } = usePostContext();
  const { user } = useProfileContext();
  const [data, setData] = useState({
    id: id,
    description: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    createPost(data);
    {
      posted && onClose();
    }
  };
  return (
    <>
      <div className="w-full h-auto gap-5 pb-5 bg-white flex flex-col items-center ">
        <div className="w-full h-[5em] flex items-center justify-evenly gap- bg-back ">
          <div className="w-[5.1em] h-[5.1em] flex items-center justify-center bg-black rounded-full createPostImg">
            <img
              src={user?.data?.pfp}
              alt=""
              className="
            object-cover h-[2.9em] w-[2.9em] md:h-[5em] md:w-[5em] rounded-full "
            />
          </div>
          <div className="w-[70%]">
            <p className="font-med md:text-2xl ">Hey {user?.data?.firstName}, Share some Moments..... </p>
          </div>
        </div>
        <div className="w-full text-center">
          <form onSubmit={handleForm}>
            <textarea
              name="post"
              id="post"
              required
              placeholder="Write About Something"
              className=" resize-none  w-[95%] h-[12em] p-2 text-lg rounded-lg border border-gray-200"
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
            <input
              type="submit"
              value="Post"
              className={`w-[5em] h-[2em] font-bold text-xl rounded-3xl border-2   text-white float-right mx-3 ${
                !data.description
                  ? "bg-gray-500 bg-opacity-55 text-gray-500"
                  : "bg-blue-600 hover:bg-blue-800"
              }`}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
