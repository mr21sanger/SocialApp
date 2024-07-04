import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { setting } from "../icons";
import { useProfileContext } from "../Reducer/profileReducer";
import Modal from "./Modal";
import EditProfile from "./EditProfile";

function ProfileBox() {
  const { user } = useProfileContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full h-full ">
        {/* PROFILE BACKGROUND  IMAGE */}
        <div className="h-[8.5em]  relative ">
          <div className="w-full h-[5em] bg-gray-700 bg-opacity-15 rounded-t-2xl">
            <img
              src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg"
              alt=""
              className="object-cover h-[5em] w-full rounded-t-2xl"
            />
          </div>
          {/* PROFILE IMAGE */}
          <div className="w-full flex justify-center absolute top-[2em]">
            <div
              className={`w-[7vw] h-[15.4vh] rounded-full bg-white border-gray-700 border flex items-center justify-center`}
            >
              <img
                src={
                  user?.pfp 
                }
                alt="pfp"
                className={`w-[6.8vw] h-[14.8vh] rounded-full object-cover`}
              />
            </div>
          </div>
        </div>

        <div className="w-[100%]  pb-2 mx-auto text-center flex flex-col border-b border-gray-700 border-opacity-35 justify-center items-center ">
          {/* NAME */}
          <p className="font-bold text-2xl w-full text-center">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="w-[85%] text-center text-sm ">{user?.bio}</p>
        </div>

        {/* CONNECTED WITH BLOCK */}

        <div className="w-full text-center h-auto py-1  hover:bg-gray-300 ">
          <NavLink className=" text-base  text-gray-700 font-medium  ">
            Connected with{" "}
            <span className="text-blue-600">{user?.followers?.length} </span>
            people
          </NavLink>
        </div>

        <button
          className=" text-gray-700 py-1  mx-auto w-full text-center font-medium hover:bg-gray-300 flex items-center gap-1 justify-center "
          onClick={() => setShow(true)}
        >
          <span className="text-gray-700 text-2xl">{setting}</span>Edit Profile
        </button>

        {show && (
          <Modal onClose={() => setShow(false)} element={<EditProfile />} />
        )}
      </div>
    </>
  );
}

export default ProfileBox;
