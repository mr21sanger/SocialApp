import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import StartChatBanner from "../component/StartChatBanner";
import ChatPerson from "../component/ChatPerson";
import { useChatContext } from "../Reducer/chatReducer";
import { useSocket } from "../Reducer/socketServer";

function ChatPage() {
  const [startChatting, setStartChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState("");
  const [clickedPerson, setClickedPerson] = useState();
  const { fetchChats, allChats, loading, notification } = useChatContext();
  const id = localStorage.getItem("id");

  const { socket } = useSocket();

  const handleClick = (currUser, id) => {
    setStartChatting(true);
    setClickedPerson(currUser);
    setChatId(id);
  };

  useEffect(() => {
    fetchChats(id);
    // socket.on("chat_notification", (data) => {
    //   console.log(data);
    // });
  }, [id]);

  useEffect(() => {
    setChats(allChats);
  }, [allChats]);

  return (
    <>
      <div className="w-full  h-full flex overflow-hidden">
        <div className="w-[30%] h-full border-2  chatPage">
          <div className="w-full h-[4em] bg-red-0 flex items-center mx-2 md:mx-0 md:justify-center">
            <h1 className="font-semibold text-3xl flex justify-center items-center gap-2">
              <IoChatbubbleEllipses /> Messages
            </h1>
          </div>

          {/* MESSENGERS AND CHATTERS BLOCK */}

          <div className="h-auto w-full   ">
            {chats &&
              chats.map((currElem) => {
                const currUser = currElem.chatPersonId.filter(
                  (person) => person._id !== id
                );
                return (
                  <div
                    className="h-[4.5em] w-[97%] my-1 transition-all duration-200  mx-auto  border-y border-gray-700 flex items-center hover:border hover:rounded-lg hover:bg-gray-200"
                    onClick={() => handleClick(currUser, currElem?._id)}
                  >
                    <div className="w-[20%] h-full flex items-center justify-center">
                      <img
                        src={currUser?.[0]?.pfp}
                        className="border border-black w-[3.6em] h-[3.6em] rounded-full bg-white object-cover"
                      />
                    </div>

                    <div className="w-[70%] p-1 h-[80%] bg-red-20">
                      <h3 className="w-[85%] text-left font-medium text-lg leading-4 mt-1">
                        {currUser?.[0]?.firstName +
                          " " +
                          currUser?.[0]?.lastName}
                      </h3>
                      <p>
                        {currElem?.latestMessage?.content}
                        <span className="text-gray-500 text-sm"></span>
                      </p>
                    </div>

                    <div className="w-[10%] h-[80%] flex items-center justify-center">
                      {notification ? (
                        <div className="rounded-full bg-red-500 w-3 h-3"></div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="w-[60%] h-full border mx-1">
          {startChatting ? (
            <ChatPerson currUser={clickedPerson} chatId={chatId} />
          ) : (
            <StartChatBanner />
          )}
        </div>
      </div>
    </>
  );
}

export default ChatPage;
