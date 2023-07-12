import React, { useContext, useEffect, useRef } from "react";
import { authContext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";
import "../App.css";

export default function Message({ message }) {
  const currentUser = useContext(authContext);
  const { data } = useContext(chatContext);

  // console.log(message);

  const currentMessageRef = useRef();

  useEffect(() => {
    currentMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={currentMessageRef}
      className={`flex items-center  mb-3 ${
        message.senderId === currentUser.uid ? "owner" : "notowner"
      }`}
    >
      <div className="flex flex-col items-center mr-0 md:mr-3 notowner">
        <img
          src={
            message.senderId == currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-[20px] h-[20px] ml-[-3px] md:w-[50px] md:h-[50px] object-cover rounded-full"
        />
        <span className="text-xs md:text-xs">Just Now</span>
      </div>
      <div className="messgeContent mb-3 w-[55%]  md:w-[30%]">
        <span className="bg-violet-400 drop-shadow-md text-white text-xs md:text-none rounded-md px-1 md:px-5 py-1 ">
          {message.text}
        </span>
        {message.img && (
          <img src={message.img} alt="" className=" object-contain  mt-3" />
        )}
      </div>
    </div>
  );
}
