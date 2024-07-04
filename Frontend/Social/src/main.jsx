import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../src/css/responsive.css";
import { BrowserRouter } from "react-router-dom";
import { ProfileContextProvider } from "./Reducer/profileReducer.jsx";
import { PostProvider } from "./Reducer/postReducer.jsx";
import { NotificationProvider } from "./Reducer/notificationReducer.jsx";
import { SocketProvider } from "./Reducer/socketServer.jsx";
import { ChatProvider } from "./Reducer/chatReducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <ProfileContextProvider>
        <PostProvider>
          <ChatProvider>
            <NotificationProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </NotificationProvider>
          </ChatProvider>
        </PostProvider>
      </ProfileContextProvider>
    </SocketProvider>
  </>
);
