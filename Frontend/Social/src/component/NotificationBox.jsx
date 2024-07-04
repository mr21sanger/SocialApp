import React, { useEffect, useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";
import { usePostContext } from "../Reducer/postReducer";

function NotificationBox({ data }) {
  const [reactedUser, setReactedUser] = useState({});
  const [reactedPost, setReactedPost] = useState({});
  const { getUserInfo } = useProfileContext();
  const { getPost } = usePostContext();

  useEffect(() => {
    const reactedUserId = data?.reactedBy;
    const postId = data?.postId;
    const fetchReactedUser = async () => {
      const getReactedUser = await getUserInfo(reactedUserId);
      setReactedUser(getReactedUser);
    };

    const fetchReactedPost = async () => {
      const reactedPostDetails = await getPost(postId);
      setReactedPost(reactedPostDetails);
    };
    if (reactedUserId) fetchReactedUser();
    if (postId) fetchReactedPost();
  }, [data]);


  return (
    <>
      <div
        className={`w-full h-[4.5em] flex items-center gap-2 px-5 border-y my-0.5 borde-black ${
          data?.read ? "bg-gray-50 bg-opacity-80" : "bg-slate-400 bg-opacity-50 "
        }`}
      >
        <div className="w-[3.5em] h-[3.5em] bg-none rounded-full flex items-center justify-center notificationImage">
          <img
            src={reactedUser?.pfp}
            alt=""
            className="w-full h-full rounded-full object-cover "
          />
        </div>
        <div className="w-[70%] h-full text-left text-lg md:text-xl  font-medium flex items-center">
          <p className="w-[75%]">
            {reactedUser?.firstName + " " + data?.message?.toLowerCase()}
          </p>
          {reactedPost?.post?.length > 0 && (
            <div className="w-[3em] h-[80%] rounded-lg bg-black reactedImg">
              <img
                src={reactedPost?.post?.[0]}
                alt=""
                className="w-full h-full object-cover rounded-lg border border-black"
              />
            </div>
          )}
        </div>
        <div className="w-[2%]">
          {
            data?.read ? null : <span class="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
          }
        </div>
       
      </div>
    </>
  );
}

export default NotificationBox;
