import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  create,
  home,
  messages,
  notification,
  profile,
  exit
} from "../icons";
import Modal from "./Modal";
import CreatePostCont from "./CreatePostCont";
import { useSocket } from "../Reducer/socketServer";
import { useProfileContext } from "../Reducer/profileReducer";

function NavbarBox() {
  const navigate = useNavigate();
  const [searchBox, setSearchBox] = useState(false);
  const [createPostBox, setCreatePostBox] = useState(false);
  const { handleLogout } = useProfileContext();

  const id = localStorage.getItem("id");
  const [pending, setPending] = useState(false);

  const { socket } = useSocket();
  useEffect(() => {
    socket.on("Pending_Notification", ({ pendingStatus }) => {
      setPending(pendingStatus);
    });
    socket.on("readed", ({ pendingStatus }) => {
      setPending(pendingStatus);
    });
  }, [socket]);

  const options = [
    {
      id: 0,
      name: "Home",
      icon: home,
      onClick: () => navigate("/"),
    },
    {
      id: 1,
      name: "Create",
      icon: create,
      onClick: () => setCreatePostBox(!createPostBox),
    },
    {
      id: 2,
      name: "Messages",
      icon: messages,
      onClick: () => navigate("/chat"),
    },
    {
      id: 3,
      name: "Notifications",
      icon: notification,
      status: pending,
      onClick: () => navigate(`/notification`),
    },
    {
      id: 4,
      name: "Your Profile",
      icon: profile,
      onClick: () => navigate(`/profile/${id}`),
    },
    {
      id: 5,
      name: "Logout",
      icon: exit,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <>
      <div className="w-[22vw] h-[100vh] bg-gray-50 border-r-2 border-black pl-5 none ">
        <div className="w-full h-[15vh] flex items-center">
          <img src="/logo.png" alt="" className="h-[7vh] -skew-x-12" />
        </div>

        <div className="h-[80vh] flex flex-col gap-2">
          {options.map((currElem) => {
            return (
              <button
                key={currElem.id}
                to={currElem?.to || ""}
                className="
                  w-[95%] h-[3em] flex items-center rounded-lg  pl-5 text-lg font-bold hover:bg-gray-500 hover:bg-opacity-20 gap-2"
                onClick={currElem?.onClick}
              >
                <span className="text-3xl">{currElem.icon}</span>
                <span className="w-[65%] text-left">{currElem.name}</span>
                {currElem?.status ? (
                  <span class="flex w-3 h-3 me-3 bg-red-600 rounded-full"></span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 h-[3.5em]  items-center justify-center gap-[2.5em] border-t-2 flex border-black w-full md:hidden">
        {options.map((currElem) => {
          if (currElem.name != "Search") {
            return (
              <button
                key={currElem.id}
                to={currElem?.to}
                // className={({ isActive }) =>
                //   `${
                //     isActive
                //       ? "text-white bg-black p-2 my-5 rounded-lg text-3xl"
                //       : "text-black"
                //   }`
                // }
                onClick={currElem?.onClick}
              >
                <span className="text-3xl">{currElem?.icon}</span>
              </button>
            );
          }
        })}
      </div>
      {searchBox && (
        <Modal
          onClose={() => setSearchBox(false)}
          className="w-[35vw] h-[80vh]"
        />
      )}
      {createPostBox && (
        <Modal
          onClose={() => setCreatePostBox(false)}
          className="w-[35vw] h-[80vh]"
          element={<CreatePostCont onClose={() => setCreatePostBox(false)} />}
        />
      )}
    </>
  );
}

export default NavbarBox;
