import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // creating user with email and password in firebase authentication
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // uploading image in the firebase storage
    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setErr(true);
      },
      () => {
        // getting url of the image -> downloadURL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // updating user profile  with the displayName and photoURL.. user obj consists of displayName:null and photoURL:null. we updating it
          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });

          // saving data into firebase db with collection name persons and giving id as user obj contains uid --> user.uid
          const saveData = await setDoc(doc(db, "persons", user.uid), {
            userId: user.uid,
            email,
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", user.uid), {});

          navigate("/");

          console.log("File available at", downloadURL);
        });
      }
    );

    console.log(user.uid, saveData, profileUpdate);
  };

  return (
    <main className="flex flex-col md:items-center md:justify-center ml-10 h-[100vh] md:ml-0">
      <div className="flex flex-col items-center justify-center shadow-md bg-white rounded-md max-w-[70vw] px-10 py-4 mt-20 md:mt-0 md:px-20 md:py-5">
        <h4 className="text-3xl mb-3">Chatter</h4>
        <h4 className="text-sm mb-10">Register</h4>
        <form
          action=""
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="display name"
            required
          />

          <input
            type="email"
            name=""
            id=""
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name=""
            id=""
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="password"
            required
          />
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="m-4 flex items-center cursor-pointer"
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/bubbles/50/image.png"
              alt="image"
            />
            <p>choose file</p>
          </label>
          {file && <p>Chosen: {file.name}</p>}
          <button
            type="submit"
            className="m-4 bg-purple-400 px-4 py-1 rounded-md text-white hover:text-black hover:bg-purple-500"
          >
            Sign Up
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}
          <p className="text-xs">
            You don't have an account?{" "}
            <Link className="text-purple-400 cursor-pointer" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
