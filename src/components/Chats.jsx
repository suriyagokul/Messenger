import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { authContext } from "../context/AuthContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const currentUser = useContext(authContext);

  useEffect(() => {
    const getData = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getData();
  }, [currentUser.uid]);

  Object.entries(chats).map((chat) => {
    console.log(chat[1].userInfo.displayName);
  });

  return (
    <div>
      {Object.entries(chats)?.map((chat) => (
        <div
          key={chat[0]}
          className="flex items-center p-3 mt-3 h-16  hover:bg-slate-700 cursor-pointer hover:scale-y-105 ease-in duration-300"
        >
          <img
            src={chat[1]?.userInfo.photoURL}
            className="rounded-full w-[50px] h-[50px] object-cover object-center mr-4"
            alt=""
          />
          <p className="text-sm text-white">{chat[1]?.userInfo.displayName}</p>
        </div>
      ))}
    </div>
  );
};

export default Chats;
