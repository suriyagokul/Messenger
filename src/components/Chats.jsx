import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { authContext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const currentUser = useContext(authContext);
  const { data, dispatch } = useContext(chatContext);

  useEffect(() => {
    const getData = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getData();
  }, [currentUser.uid]);

  const handleSelect = (u, chatId) => {
    setSelectedChatId(chatId);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const chatId = chat[0];
          const chatData = chat[1];
          const isSelected = chatId === selectedChatId;

          return (
            <div
              key={chatId}
              className={`flex items-center p-3 mt-3 h-16 ${
                isSelected ? "bg-green-300" : ""
              } hover:bg-slate-700 cursor-pointer hover:scale-y-105 ease-in duration-300`}
              onClick={() => handleSelect(chatData.userInfo, chatId)}
            >
              <img
                src={chatData?.userInfo.photoURL}
                className="rounded-full w-[50px] h-[50px] object-cover object-center mr-4"
                alt=""
              />
              <div>
                <p className="text-sm text-white">
                  {chatData?.userInfo.displayName}
                </p>
                <p className="text-xs text-white">
                  {chatData?.lastMessage?.text}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
