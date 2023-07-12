import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";
import { authContext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";
import { storage } from "../firebase";
import "../App.css";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // console.log(text, img);

  const currentUser = useContext(authContext);
  const { data } = useContext(chatContext);

  console.log(data.chatId);

  const handleSend = async () => {
    if (img) {
      // uploading image in the firebase storage
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="bg-white h-20 w-[100%] p-3 flex md:justify-between md:items-center">
      <textarea
        type="text"
        placeholder="Type Something..."
        value={text}
        className="outline-none caret-purple-500 border-none w-[40%] mt-4 overflow-x-hidden overflow-y-scroll plcaeholder:text-gray-500"
        onChange={(e) => setText(e.target.value)}
        style={{
          resize: "none",
        }}
      ></textarea>
      <div className="flex items-center justify-between w-[20%]">
        <AttachFileIcon className="text-purple-500 cursor-pointer" />
        <input
          className="hidden "
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file" className="cursor-pointer">
          <AddPhotoAlternateOutlinedIcon className="text-purple-500" />
        </label>
        <button
          className="bg-purple-400 cursor-pointer text-white rounded-md px-3 hover:bg-purple-500"
          onClick={handleSend}
        >
          send
        </button>
      </div>
    </div>
  );
}
