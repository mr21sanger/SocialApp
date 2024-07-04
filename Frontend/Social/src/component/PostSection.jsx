import React, { useEffect, useState } from "react";
import { comment, like, liked } from "../icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";
import { usePostContext } from "../Reducer/postReducer";
import { useProfileContext } from "../Reducer/profileReducer";
import CommentBox from "./CommentBox";

function PostSection({ data }) {
  const { user } = useProfileContext();

  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState(false);
  const [commentClick, setCommentClick] = useState(false);
  const id = user?._id;
  const [likeCount, setLikeCount] = useState(data?.like?.length);
  const [totalComment, setTotalComment] = useState(data?.comment?.length);
  const [allComments, setAllComments] = useState([data?.comment]);

  useEffect(() => {
    data?.like.map((currElem) => {
      if (currElem == id) setClicked(true);
    });
  }, [user]);

  const [commentData, setCommentData] = useState({
    userId: id,
    comment: "",
  });

  const { likedPost, commentPost } = usePostContext();
  const handleLikeClick = () => {
    const postId = data._id;
    const userId = id;
    likedPost(postId, userId);
    if (!clicked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setClicked(!clicked);
  };

  useEffect(() => {
    if (data?.post.length > 0) setImage(true);
  }, []);

  useEffect(() => {}, [handleLikeClick]);

  const handleCommentClick = () => {
    setCommentClick(!commentClick);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const postId = data._id;
    commentPost(postId, commentData);
    setAllComments([...allComments, commentData?.comment]);
    setCommentData({ ...commentData, comment: "" });
  };

  return (
    <>
      <div className="w-full">
        <div className="w-[95%] h-auto mt-3 mx-auto">
          <p className="text-lg ">{data?.description}</p>
        </div>

        {image ? (
          <div className="h-[auto] w-[100%] my-2  -z-0">
            <Carousel showThumbs={false}>
              {data?.post.map((currElem) => {
                return (
                  <div key={currElem.id}>
                    <img
                      src={currElem}
                      alt=""
                      className="
            max-h-[75vh] w-[100%] object-fill"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : null}

        <div className="w-[95%] mx-auto h-[3em] border-t border-gray-500 border-opacity-30 mt-2 flex justify-between px-10 items-center ">
          <button
            onClick={handleLikeClick}
            className={`flex justify-center items-center gap-1 text-lg hover:bg-gray-300 px-5 py-1 rounded-3xl font-medium ${
              !clicked ? "text-gray-700" : "text-blue-700"
            }`}
          >
            <span
              className={`text-3xl ${
                !clicked ? "text-gray-700" : "text-blue-700"
              } `}
            >
              {clicked ? liked : like}
            </span>
            Like {likeCount}
          </button>

          <button
            className="text-lg font-medium text-gray-700 hover:bg-gray-300 px-5 py-1 rounded-3xl flex justify-center gap-1 items-center"
            onClick={handleCommentClick}
          >
            <span className="text-3xl">{comment}</span>
            {totalComment} Comment
          </button>
        </div>

        {commentClick ? (
          <div className="h-auto">
            <form onSubmit={handleCommentSubmit}>
              <div className="w-full flex items-center justify-center gap-2">
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a Comment..."
                  value={commentData.comment}
                  onChange={(e) =>
                    setCommentData({ ...commentData, comment: e.target.value })
                  }
                  className="w-[80%] h-[2em] px-2 rounded-lg bg-transparent text-lg text-gray-700 border-2 border-gray-700 border-opacity-55 "
                />
                <input
                  type="submit"
                  value="Post"
                  className="bg-blue-600 px-3 py-1.5 text-white text-lg font-bold rounded-xl"
                />
              </div>
            </form>
            {allComments?.[0]?.map((currElem) => {
              return (
                <CommentBox
                  key={currElem.id}
                  data={currElem}
                  newComment={commentData?.comment}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PostSection;
