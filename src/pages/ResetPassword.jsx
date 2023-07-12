import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";

const ResetPassword = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    var actionCodeSettings = {
      // After password reset, the user will be given the ability to go back to this page.
      url: "http://localhost:5173/login",
      handleCodeInApp: false,
    };

    // Modify the actionCodeSettings object to include a success callback
    // actionCodeSettings.successCallback = function () {}

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      toast.success("Password Reset Mail Sent!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay navigation by 2 seconds (adjust as needed)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Email not found!");
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:items-center md:justify-center ml-10 h-[100vh] md:ml-0">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center shadow-md bg-white rounded-md max-w-[70vw] px-10 py-4 mt-20 md:mt-0 md:px-20 md:py-5">
        <h4 className="text-3xl mb-3">Chatter</h4>
        <h4 className="text-sm mb-10">Reset Password</h4>
        <form
          action=""
          className="flex flex-col items-center justify-center"
          onSubmit={handleReset}
        >
          <input
            type="email"
            name=""
            id=""
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email"
          />
          <button
            type="submit"
            disabled={loading}
            className={`m-4 bg-purple-400 px-4 py-1 rounded-md text-white hover:text-black hover:bg-purple-500 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Processing..."
              : success
              ? "Sent"
              : "Request Reset Link"}
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}

          <Link className="text-purple-400 cursor-pointer" to="/login">
            Back To Login
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
