import React, { useEffect, useState } from "react";
import Box3 from "../component/Box3";
import Thought from "../component/Thought";
import Posts from "../component/Posts";
import ProfileBox from "../component/ProfileBox";
import MorePeopleBox from "../component/MorePeopleBox";
import { usePostContext } from "../Reducer/postReducer";
import Loading from "../component/Loading";

function Home() {
  const { getAllPosts, loading, post } = usePostContext();
  var { allPost, liked } = usePostContext();
  const [postsData, setPostsData] = useState();

  useEffect(() => {
    getAllPosts("all");
  }, [post]);

  useEffect(() => {
    if (!loading) {
      setPostsData(allPost?.data);
    }
  }, [loading]);

  return (
    <>
      <div className="flex justify-left gap-8 h-full w-full">
        <div className="w-[50vw] h-full ">
          <div className="w-full h-[7em]">
            <Thought />
          </div>

          <div className="w-[74%] rounded-lg mx-auto h-[4em] my-1 border-gray-500 border bg-gray-50 flex items-center justify-center  filterPost">
            <button
              className="px-4 w-full h-full font-semibold text-xl rounded-l-lg hover:bg-gray-200 ring-2 ring-black"
              onClick={() => {
                getAllPosts("all");
              }}
            >
              For You
            </button>
            <button
              className="px-4 w-full h-full font-semibold text-xl rounded-r-lg hover:bg-gray-200 ring-2 ring-black"
              onClick={() => {
                getAllPosts("following");
              }}
            >
              Following
            </button>
          </div>

          <div className="w-[80%] mx-auto  flex flex-col-reverse justify-center">
            {loading
              ? // <Loading />
                ""
              : postsData &&
                postsData?.map((currElem) => (
                  <Posts data={currElem} key={currElem.id} />
                ))}
          </div>
        </div>

        <div className="h-[100vh] items-center flex flex-col  ">
          <Box3>
            <ProfileBox />
          </Box3>
          <Box3>
            <MorePeopleBox />
          </Box3>
        </div>
      </div>
    </>
  );
}

export default Home;
