import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Message from "./Message";
import { chatContext } from "../context/ChatContext";
import { db } from "../firebase";
import "../App.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(chatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="p-5 h-[80%] overflow-y-scroll notowner">
      {messages.map((message) => {
        return <Message message={message} />;
      })}
    </div>
  );
}
