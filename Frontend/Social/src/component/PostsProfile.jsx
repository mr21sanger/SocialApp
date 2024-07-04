import React, { useEffect, useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";
import moment from "moment";

function PostsProfile({ data }) {
  const [follow, setFollow] = useState(false);
  const { getUserInfo, user, followUser } = useProfileContext();
  const [show, setShow] = useState(true);

  const [postUserData, setPostUserData] = useState(); // POST USER DATA
  const postUserId = data?.userId; // ID OF POST USER
  const userId = user?._id; // LOGGED IN USER ID
  const loggedUserData = user; // DATA OF LOGGED IN USER
  const date = moment(data?.createdAt).startOf("hour").fromNow();

  useEffect(() => {
    if (postUserId == userId) {
      setShow(false);
    }
    loggedUserData?.following.map((currElem) => {
      if (currElem == postUserId) return setFollow(true);
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(postUserId);
        setPostUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (postUserId) {
      fetchUserData();
    }
  }, [postUserId, getUserInfo]);

  const handleClick = () => {
    setFollow(!follow);
    followUser(postUserId, userId);
  };
  return (
    <>
      {/* PROFILE INFORMATION BLOCK */}
      <div className="flex justify-left gap-2 ml-3 items-center mx-auto">
        <div
          className={`w-[4vw] h-[8.4vh] rounded-full bg-black flex items-center justify-center profileImage`}
        >
          <img
            src={postUserData?.pfp}
            alt="pfp"
            className={`w-[3.8vw] h-[8vh] rounded-full object-cover`}
          />
        </div>
        {/* Profile Name of the person */}
        <div className=" w-[23vw] name">
          <p className="font-medium text-lg leading-5">
            {postUserData?.firstName + " " + postUserData?.lastName}
          </p>
          <p className="text-sm font-normal  overflow-ellipsis text-nowrap overflow-hidden">
            • {date}
          </p>
        </div>

        {/* FOLLOW BUTTON */}
        {show && (
          <button
            className={`${
              !follow
                ? "text-blue-700 font-bold "
                : "text-gray-800 text-opacity-55"
            } text-lg  `}
            onClick={handleClick}
          >
            {!follow ? "+ Follow" : "following"}
          </button>
        )}
      </div>
    </>
  );
}

export default PostsProfile;
