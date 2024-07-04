import { FaHome, FaSearch } from "react-icons/fa";
import { IoMdNotifications, IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { VscDiffAdded } from "react-icons/vsc";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";

import { IoMdExit } from "react-icons/io";


import { IoSettings } from "react-icons/io5";

const home = <FaHome />;
const exit = <IoMdExit />;
const notification = <IoMdNotifications />;
const messages = <IoChatbubbleEllipses />;
const profile = <CgProfile />;
const create = <VscDiffAdded />;
const setting = <IoSettings />;

const like = <BiLike />;
const liked = <BiSolidLike />;
const comment = <AiOutlineComment />;
const close = <IoMdClose/>
export {
  home,
  exit,
  notification,
  messages,
  profile,
  create,
  like,
  liked,
  comment,
  setting,
  close
};
