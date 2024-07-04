import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { useSocket } from "./socketServer";

const ChatContext = createContext();

const initialState = {
  loading: false,
  chat: null,
  allChats: null,
  allMessages: null,
  notification: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: true,
      };
    case "chat":
      return {
        ...state,
        loading: false,
        chat: action.payload,
      };

    case "Set_chats":
      return {
        ...state,
        loading: false,
        allChats: action.payload,
      };

    case "Add_Message":
      const messages = [...state?.allMessages, action?.payload];
      return {
        ...state,
        loading: false,
        allMessages: messages,
      };

    case "Get_All_Message":
      return {
        ...state,
        loading: false,
        allMessages: action.payload,
      };

    case "set_notification":
      return {
        ...state,
        notification: action.payload,
      };

    default:
      break;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { socket } = useSocket();

  const setChatNotification = (hasNotification) => {
    dispatch({ type: "set_notification", payload: hasNotification });
  };

  const addCurrentMessage = (chat) => {
    dispatch({ type: "Add_Message", payload: chat });
  };

  const createChat = (id, currentUser) => {
    const data = {
      currentUser,
    };
    dispatch({ type: "Loading" });
    axios
      .post(`http://localhost:3000/api/chat/${id}`, data)
      .then((res) => {
        if (res?.status) {
          dispatch({ type: "chat", payload: res?.data?.data });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchChats = (id) => {
    dispatch({ type: "Loading" });
    axios
      .get(`http://localhost:3000/api/chat/fetchChats/${id}`)
      .then((res) => {
        if (res?.data?.status) {
          dispatch({ type: "Set_chats", payload: res?.data?.data });
        }
      })
      .catch((e) => console.error(e));
  };

  const fetchMessages = (id) => {
    dispatch({ type: "Loading" });
    axios
      .get(`http://localhost:3000/api/chat/getMessage/${id}`)
      .then((res) => {
        dispatch({ type: "Get_All_Message", payload: res?.data?.data });
      })
      .catch((e) => console.error(e));
  };

  const sendMessage = (senderId, data) => {
    axios
      .post(`http://localhost:3000/api/chat/sendMessage/${senderId}`, data)
      .then((res) => {
        if (res?.data?.status) {
          const chatData = res?.data?.data;
          addCurrentMessage(chatData);
          socket.emit("chat_message", { chatData });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        createChat,
        fetchChats,
        sendMessage,
        fetchMessages,
        addCurrentMessage,
        setChatNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
