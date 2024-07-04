import React, { useEffect, useState } from "react";
import { useNotification } from "../Reducer/notificationReducer";
import { useSocket } from "../Reducer/socketServer";
import { useProfileContext } from "../Reducer/profileReducer";
import { usePostContext } from "../Reducer/postReducer";
import Loading from "../component/Loading";
import NotificationBox from "../component/NotificationBox";

function Notification() {
  const { isLoading, notification } = useNotification();

  const { getAllNotification, markRead } = useNotification();
  const { socket } = useSocket();

  const loggedInId = localStorage.getItem("id");

  useEffect(() => {
    getAllNotification(loggedInId, "all");
    socket.emit("Read_Notification", { pendingStatus: false });
  }, []);

  const buttons = [
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "Likes",
      type: "like",
    },
    {
      id: 2,
      name: "Comments",
      type: "comment",
    },
    {
      id: 3,
      name: "Followers",
      type: "follow",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[50vw] p-5 border border-b-0 flex-col items-center flex notificationPage">
          <div className="w-full flex justify-center">
            <button
              className="w-[45vw] p-1 bg-gray-200 font-semibold text-xl border border-black drop-shadow-2xl markAsReadButton"
              onClick={() => markRead(loggedInId)}
            >
              Mark all as read
            </button>
          </div>

          <div className="bg-gray-20 w-[45vw] rounded-t-lg my-2 font-bold text-xl py-2   border border-b-0 notifications">
            <div className="w-full h-[2.5em] notifications border-b border-black px-1.5 md:px-3 flex items-center gap-1 md:gap-2">
              {buttons.map((currElem) => {
                return (
                  <button
                    className="w-auto px-3 py-0.5 border-2 border-black hover:scale-105 transition-all duration-200 rounded-lg text-black my-2 filterOptions"
                    key={currElem.id}
                    onClick={() =>
                      getAllNotification(loggedInId, currElem?.type)
                    }
                  >
                    {currElem.name}
                  </button>
                );
              })}
            </div>

            <div className="h-auto flex flex-col-reverse">
              {notification?.map((currElem) => {
                return <NotificationBox data={currElem} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
