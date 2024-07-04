import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { useSocket } from "./socketServer";
import { useProfileContext } from "./profileReducer";
import axios from "axios";

const NotificationContext = createContext();

const initialState = {
  isLoading: false,
  notification: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true,
      };

    case "notifications":
      return {
        ...state,
        isLoading: false,
        notification: action.payload,
      };

    default:
      break;
  }
};

export const NotificationProvider = ({ children }) => {


  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllNotification = (id, type = "all") => {
    dispatch({ type: "Loading" });
    axios
      .get(`http://localhost:3000/api/post/notification/${id}/${type}`)
      .then((res) => {
        if (res.data.status)
          dispatch({ type: "notifications", payload: res?.data?.data });
      })
      .catch((e) => {});
  };

  //MARK AS READ
  const markRead = (id) => {
    axios
      .put(`http://localhost:3000/api/post/markRead/${id}`)
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.data?.acknowledged) {
          getAllNotification(id);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, getAllNotification, markRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
