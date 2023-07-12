import React, { useContext } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { chatContext } from "../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  const { data, dispatch } = useContext(chatContext);

  console.log(data);

  return (
    <div className="flex flex-col w-[60%] lg:w-[70%]  h-[80vh] rounded-md bg-purple-100">
      <nav className=" w-[100%] py-[14px] px-3 md:px-10 bg-[#282e38]">
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <img
              src={data?.user.photoURL}
              className="w-10 h-10 rounded-full mr-2"
            />
            <h2 className="text-purple-500">{data?.user.displayName}</h2>
          </div>

          <div className="flex md:justify-between w-[40%] md:w-[15%] cursor-pointer">
            <VideocamIcon className="text-purple-500" />
            <PersonIcon className="text-purple-500" />
            <MoreHorizIcon className="text-purple-500" />
          </div>
        </div>
      </nav>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
