import React, { useEffect, useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";

function CommentBox({ data }) {
  const { getUserInfo } = useProfileContext();
  const [commentUser, setCommentUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo(data?.userId);
      setCommentUser(userData);
    };
    fetchUser();
  }, [data]);

  return (
    <div className="w-[95%] rounded-xl my-2 h-auto mx-auto py-2 bg-gray-200 flex items-center">
      <div className="w-[3.5em] bg-black h-[3.5em] mx-2 rounded-full flex items-center justify-center">
        <img
          src={commentUser?.pfp}
          alt=""
          className="object-cover rounded-full h-[3.4em] w-[3.4em]  "
        />
      </div>
      <div className="w-[80%] h-full">
        <h1 className="font-semibold text-lg mx-1">
          {commentUser?.firstName + " " + commentUser?.lastName}{" "}
          <span className="font-normal text-sm">.1m</span>{" "}
        </h1>

        <p className="text-sm mx-1">{data?.comment}</p>
      </div>
    </div>
  );
}

export default CommentBox;
