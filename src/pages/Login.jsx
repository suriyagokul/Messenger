import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErr(true);
      toast.error("Login Credentials don't match");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:items-center md:justify-center ml-10 h-[100vh] md:ml-0">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center shadow-md bg-white rounded-md max-w-[70vw] px-10 py-4 mt-20 md:mt-0 md:px-20 md:py-5">
        <h4 className="text-3xl mb-3">Chatter</h4>
        <h4 className="text-sm mb-10">Login</h4>
        <form
          action=""
          className="flex flex-col items-center justify-center"
          onSubmit={handleLogin}
        >
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
          <Link
            className="text-purple-400 cursor-pointer text-xs self-start"
            to="/resetpassword"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="m-4 bg-purple-400 px-4 py-1 rounded-md text-white hover:text-black hover:bg-purple-500"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Processing..." : "Sign In"}
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}

          <p className="text-xs">
            You don't have an account?{" "}
            <Link className="text-purple-400 cursor-pointer" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
