import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../Reducer/chatReducer";
import Spinner from "./Spinner";
import AllMessage from "./AllMessage";
import { useSocket } from "../Reducer/socketServer";

function ChatPerson({ currUser, chatId }) {
  const loggedIn = localStorage.getItem("id");
  const {
    sendMessage,
    fetchMessages,
    loading,
    allMessages,
    addCurrentMessage,
  } = useChatContext();
  const [chatMessage, setChatMessage] = useState([]);
  const [data, setData] = useState({
    content: "",
    id: chatId,
  });

  const { socket } = useSocket();

  const navigate = useNavigate();

  const handleSend = () => {
    sendMessage(loggedIn, data);
    setData({ ...data, content: "" });
  };

  useEffect(() => {
    fetchMessages(chatId);
    socket.emit("join chat", chatId);
  }, [chatId]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.chatId._id === chatId) {
        addCurrentMessage(message);
        setChatMessage((prevMessages) => [...(prevMessages || []), message]);
      } else {
        console.log("notifications");
      }
    };
    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [chatId]);

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    setChatMessage(allMessages);
  }, [allMessages]);

  return (
    <>
      <div className="w-full h-full m-2 relative ">
        <div className="h-[4em] w-[98%] bg-gray-200 border border-gray-400 flex items-center gap-2 px-2 rounded-md">
          <div className="w-[3.5em] h-[3.5em] rounded-full bg-black  ">
            <img
              src={currUser?.[0]?.pfp}
              alt=""
              className="w-full h-full object-cover rounded-full border border-black"
            />
          </div>

          <div className="w-[70%] px-2 py-0.5 h-[80%] flex items-center">
            <h4 className="font-bold text-xl">
              {currUser?.[0]?.firstName + " " + currUser?.[0]?.lastName}
            </h4>
          </div>
        </div>

        <div className="overflow-y-scroll h-[80%] absolute w-[98%] rounded-xl scrollbar-hover">
          <div className="w-full h-[45%] bg-blac flex flex-col items-center justify-center ">
            <div className="w-[7em] h-[7em] rounded-full bg-black  ">
              <img
                src={currUser?.[0]?.pfp}
                alt=""
                className="w-full h-full object-cover rounded-full border border-black"
              />
            </div>
            <div className="w-full px-2 py-0.5 h-auto flex flex-col items-center justify-center">
              <h4 className="font-bold text-xl">
                {currUser?.[0]?.firstName + " " + currUser?.[0]?.lastName}
              </h4>
              <p>This is the Starting of your Conversation </p>
              <button
                className="px-2 py-1 my-2 rounded-lg border-black border-2 font-bold"
                onClick={() => handleClick(currUser?.[0]?._id)}
              >
                View Profile
              </button>
            </div>
          </div>

          {/* MESSAGES BLOCK */}
          <div className="w-[95%] mx-auto my-2 ">
            {loading ? (
              <Spinner />
            ) : (
              <AllMessage messages={chatMessage} key={chatMessage?.id} />
            )}
          </div>
        </div>

        <div className="b w-[48%] mx-0.5 h-[3em] fixed bottom-1">
          <div className="w-[95%] mx-auto  h-full flex items-center border-2 border-black rounded-2xl">
            <textarea
              name="chat"
              id="chat"
              className="w-[90%] outline-none resize-none rounded-2xl px-2 py-2 leading-6 h-full bg-transparent no-scrollbar text-xl"
              placeholder="Write something to start communication"
              value={data?.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />
            <button
              className="px-2 py-1  bg-blue-600 rounded-xl font-bold text-white text-lg my-2"
              onClick={handleSend}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPerson;
