import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNotification } from "./notificationReducer";
import { useSocket } from "./socketServer";

const profileContext = createContext();

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  error: null,
  id: "",
  updatedStatus: false,
  allUsers: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: true,
      };
    case "Error":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "Updated":
      return {
        ...state,
        loading: false,
        updatedStatus: true,
      };

    case "Get_User":
      const id = action?.payload._id;
      console.log(action.payload._id);
      localStorage.setItem("id", id);
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case "AllUsers":
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        allUsers: action.payload,
      };

    case "logout":
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };

    default:
      break;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = localStorage.getItem("id");

  const { setUserData } = useSocket();

  // GET USER INFO*******************
  const getUser = (id) => {
    axios
      .get(`http://localhost:3000/api/get-user/${id}`)
      .then((res) => {
        dispatch({ type: "Get_User", payload: res?.data?.data });
        const userName = res?.data?.data.firstName + res?.data.data.lastName;
        setUserData(res?.data?.data?._id, userName);
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e });
      });
  };

  const getUserInfo = async (id) => {
    const userData = await axios
      .get(`http://localhost:3000/api/get-user/${id}`)
      .then((res) => {
        if (res?.data?.status) return res?.data?.data;
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e });
      });
    return userData;
  };

  // LOGIN API**********************

  const profileLogin = (data) => {
    dispatch({ type: "Loading" });
    axios
      .post("http://localhost:3000/api/login", data)
      .then((response) => {
        getUserInfo(response?.data?.data?._id).then((data) => {
          dispatch({ type: "Get_User", payload: data });
          const userName = data.firstName + data.lastName;
          setUserData(data?._id, userName);
        });
      })
      .catch((error) => {
        dispatch({ type: "Error", payload: error?.response?.data });
      });
  };

  // CREATE USER**********************
  const createUser = (data) => {
    dispatch({ type: "Loading" });
    axios
      .post("http://localhost:3000/api/signup", data)
      .then((res) => {
        // dispatch({ type: "Create_user", payload: res.data });
        getUser(res?.data?.data?._id);
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e?.response?.data });
      });
  };

  //UPDATE PROFILE*******************
  const updateProfile = (data, id) => {
    dispatch({ type: "Loading" });
    axios
      .put(`http://localhost:3000/api/update-profile/${id}`, data)
      .then((res) => {
        if (res.status) {
          getUser(id);
        }
        dispatch({ type: "Updated" });
      })
      .catch((e) => {
        console.log("updation error", e?.response?.data);
      });
  };

  const updatePics = (id, picsData) => {
    axios
      .put(`http://localhost:3000/api/update-pics/${id}`, picsData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log("update pfp axios error", e));
  };

  const getAllUser = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        dispatch({ type: "AllUsers", payload: response?.data });
      })
      .catch((e) => {
        dispatch({ type: "Error", payload: e });
      });
  };

  const followUser = (followId, userId) => {
    const data = {
      userId,
    };
    axios
      .post(`http://localhost:3000/api/follow/${followId}`, data)
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  const handleLogout = () => {
    dispatch({ type: "Loading" });
    localStorage.removeItem("id");
    dispatch({ type: "logout" });
  };

  return (
    <profileContext.Provider
      value={{
        ...state,
        profileLogin,
        createUser,
        updateProfile,
        getUser,
        getAllUser,
        updatePics,
        followUser,
        getUserInfo,
        handleLogout,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(profileContext);
};
