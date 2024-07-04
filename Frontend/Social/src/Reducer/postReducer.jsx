import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useSocket } from "./socketServer";

const postContext = createContext();

const initialState = {
  loading: false,
  post: null,
  user: null,
  allPost: null,
  posted: false,
  userPosts: null,
  liked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: true,
        posted: false,
      };

    case "All_Post":
      return {
        ...state,
        loading: false,
        posted: false,
        allPost: action.payload,
      };

    case "Set_userPosts":
      return {
        ...state,
        loading: false,
        posted: false,
        userPosts: action.payload,
      };

    case "Liked":
      return {
        ...state,
        loading: false,
        posted: false,
        liked: action.payload,
      };

    case "Post_created":
      return {
        ...state,
        loading: false,
        posted: true,
        post: action?.payload,
      };

    case "Error":
      return {
        ...state,
        loading: false,
        posted: false,
        error: action.payload,
      };
    default:
      break;
  }
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { socket } = useSocket();

  const id = localStorage.getItem("id");

  //GET POST

  const getPost = async (id) => {
    const getSinglePost = await axios
      .get(`http://localhost:3000/api/post/findThisPost/${id}`)
      .then((res) => {
        if (res?.data?.status) return res?.data?.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return getSinglePost;
  };

  // CREATE POST
  const createPost = (data) => {
    axios
      .post("http://localhost:3000/api/post/create-post", data)
      .then((res) => {
        dispatch({ type: "Post_created", payload: res });
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  // Get all Post
  const getAllPosts = (filter) => {
    dispatch({ type: "Loading" });
    axios
      .get(`http://localhost:3000/api/post/getAllPost/${id}/${filter}`)
      .then((res) => {
        dispatch({ type: "All_Post", payload: res?.data });
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e });
      });
  };

  const findPost = async (id) => {
    dispatch({ type: "Loading" });
    const posts = await axios
      .get(`http://localhost:3000/api/post/findPost/${id}`)
      .then((res) => {
        dispatch({ type: "Set_userPosts", payload: res?.data?.userPosts });
        // return res?.data?.userPosts;
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e });
      });
    return posts;
  };

  const createImagePost = (data, id) => {
    axios
      .post(`http://localhost:3000/api/post/createPost/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status) dispatch({ type: "Posted_created" });
      })
      .catch((e) => dispatch({ type: "Error", payload: e }));
  };

  // LIKED POST
  const likedPost = (postId, userId) => {
    const formData = {
      userId,
    };
    axios
      .put(`http://localhost:3000/api/post/like/${postId}`, formData)
      .then((res) => {
        console.log(userId);
      })
      .catch((e) => console.log(e));
  };

  const commentPost = (postId, commentData) => {
    axios
      .post(`http://localhost:3000/api/post/comment/${postId}`, commentData)
      .then((res) => dispatch({type:"Set_userPosts", payload: res?.data.data}))
      .catch((e) => console.log(e));
  };

  return (
    <postContext.Provider
      value={{
        ...state,
        getAllPosts,
        createPost,
        createImagePost,
        likedPost,
        commentPost,
        findPost,
        getPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(postContext);
};
