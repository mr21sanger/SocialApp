import React, { useEffect, useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";
import { useNavigate } from "react-router-dom";

function PeapleBox({ data }) {
  const [follow, setFollow] = useState(false);
  const { user, followUser } = useProfileContext();
  const userId = user?._id;
  const navigate = useNavigate();

  const visitProfile = () => {
    navigate(`/profile/${data?._id}`);
  };

  useEffect(() => {

    user?.following.map((currElem) => {
      if (currElem === data._id) {
        setFollow(true);
      }
    });
  }, []);

  const handleClick = () => {
    setFollow(!follow);
    const followId = data?._id;
    followUser(followId, userId);
  };

  return (
    <>
      <div className="w-[95%] mx-auto border-y-2 my-0.5 h-[3.5em] flex items-center justify-evenly  p-0.5 ">
        <div className="w-[18.5%] h-full rounded-full bg-white">
          <img
            src={data?.pfp || "/logo.png"}
            alt=""
            className="object-cover rounded-full w-[100%] h-full"
          />
        </div>
        <div
          className="w-[50%] flex flex-col justify-center pl-2 hover:cursor-pointer"
          onClick={visitProfile}
        >
          <p className="font-medium leading-4 text-sm">
            {data?.firstName + " " + data?.lastName}
          </p>
          <p className="text-nowrap overflow-hidden text-ellipsis text-xs">
            {data?.bio}
          </p>
        </div>

        <button
          className={`font-bold w-[30%] ${
            follow ? " text-gray-600 text-opacity-45 text-sm" : "text-blue-600"
          }`}
          onClick={() => handleClick()}
        >
          {!follow ? "+Follow" : "following"}
        </button>
      </div>
    </>
  );
}

export default PeapleBox;
