import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { authContext } from "../context/AuthContext";
import { db } from "../firebase";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);

  const currentUser = useContext(authContext);

  const handleSearch = async () => {
    const usersRef = collection(db, "persons");

    // Create a query against the collection.
    const q = query(usersRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  console.log(currentUser.uid);
  const handleKey = (event) => {
    // console.log(event.key);
    event.key === "Enter" ? handleSearch() : "";
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser?.uid > user?.userId
        ? currentUser?.uid + user?.userId
        : user?.userId + currentUser?.uid;
    try {
      //check whether the group (user chats in firestore) exists, if not create
      const res = await getDoc(doc(db, "chats", combinedId));

      console.log(res);

      if (!res.exists()) {
        // create a chat in chats collection between these two current user and searcheduser
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user?.userId,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.userId), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".data"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
      setErr(true);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <>
      <div className="px-3">
        <input
          type="text"
          placeholder="find a user"
          className="bg-transparent  border-b-2  border-slate-400 outline-none px-2 caret-purple-500 mt-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
        {err && <h2>Something went wrong.</h2>}
        {console.log(user)}
      </div>
      {user && (
        <div
          className="flex items-center p-3 mt-3 h-16  hover:bg-slate-700 cursor-pointer hover:scale-y-105 ease-in duration-300"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            className="rounded-full w-[50px] h-[50px] object-cover object-center mr-4"
            alt=""
          />
          <p className="text-sm text-white">{user.displayName}</p>
        </div>
      )}
    </>
  );
};

export default Search;
