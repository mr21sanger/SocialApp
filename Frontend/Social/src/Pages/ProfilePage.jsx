import React, { useEffect, useState } from "react";
import Post from "../component/Posts";
import Box3 from "../component/Box3";
import MorePeopleBox from "../component/MorePeopleBox";
import EditProfile from "../component/EditProfile";
import Modal from "../component/Modal";
import { useProfileContext } from "../Reducer/profileReducer";
import Loading from "../component/Loading";
import { usePostContext } from "../Reducer/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useChatContext } from "../Reducer/chatReducer";

function ProfilePage() {
  const [click, setClick] = useState(false);
  const { loading, getUserInfo } = useProfileContext();
  const [data, setData] = useState(); //USER DATA
  const { findPost, userPosts } = usePostContext();
  const { id } = useParams();
  const [myProfile, setMyProfile] = useState(true);
  const { createChat } = useChatContext();

  const loggedInUser = localStorage.getItem("id");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo(id);
      setData(data);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    findPost(id);
  }, [data, id]);

  useEffect(() => {
    if (loggedInUser !== id) {
      setMyProfile(false);
    } else {
      setMyProfile(true);
    }
  }, [id, loggedInUser]);

  const startChat=()=>{
    navigate("/chat");
    createChat(id, loggedInUser)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-10">
          <div className=" h-auto w-[50vw] profile rounded-t-xl text-black border">
            {/* BACKGROUND IMAGE */}
            <div className="w-full h-[36.5vh] relative">
              <div className="w-full h-[23vh] border-2 rounded-t-xl border-black flex justify-center items-end">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg"
                  alt=""
                  className="object-cover w-full h-[23vh] rounded-t-xl"
                />
              </div>
              <div className="w-[9em] h-[9em] absolute top-[6em] ml-5 rounded-full bg-black flex items-center justify-center">
                <img
                  src={data?.pfp}
                  alt="pfp"
                  className="w-[8.6em] h-[8.6em] rounded-full object-cover object-top"
                />
              </div>

              {myProfile ? (
                <button
                  className="float-right text-xl font-medium  py-2 px-5 rounded-full border-2 border-black m-3 mx-5"
                  onClick={() => setClick(!click)}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="float-right text-xl font-medium  py-2 px-5 rounded-full border-2 border-black m-3 mx-5"
                  onClick={() => startChat()}
                >
                  Message
                </button>
              )}
            </div>
            {/* INFORMATION DIV */}
            <div className="w-full h-auto ">
              <h4 className="text-2xl  font-bold mx-[1em]">
                {data?.firstName + " " + data?.lastName}
              </h4>
              <p className="w-5/6 mx-[1.4em] h-auto   font-medium text-lg">
                {data?.bio}
              </p>
            </div>
            {/* FOLLOWERS AND FOLLOWINGS */}
            <div className="w-full px-[1.4em] h-auto mx-auto flex items-center  gap-4 font-medium followerBlock">
              <p className=" text-base my-2 md:my-0 md:text-lg">
                <span className="font-bold text-green-600 ">
                  {data?.followers.length}
                </span>{" "}
                Followers
              </p>
              <p className=" text-base my-2 md:my-0 md:text-lg">
                <span className="font-bold text-green-600 ">
                  {data?.following.length}
                </span>{" "}
                Followings
              </p>
              <p className=" text-base my-2 md:my-0 md:text-lg">
                <span className="font-bold text-green-600 ">
                  {userPosts?.length}
                </span>{" "}
                Posts
              </p>
            </div>

            {/* POSTS */}
            <div className="h-auto  ">
              <div className="w-[95%] mx-auto h-[3em] flex items-center px-2 border-b border-gray-700 ">
                <h1 className="font-semibold text-2xl">Posts</h1>
              </div>

              <div className="w-[100%] mx-auto flex flex-col-reverse justify-center items-center">
                {userPosts?.map((currElem) => {
                  return (
                    <Post
                      className="profilePost"
                      data={currElem}
                      key={currElem.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="none">
            <Box3>
              <MorePeopleBox />
            </Box3>
          </div>

          {click ? (
            <Modal onClose={() => setClick(false)} element={<EditProfile />} />
          ) : null}
        </div>
      )}
    </>
  );
}

export default ProfilePage;
