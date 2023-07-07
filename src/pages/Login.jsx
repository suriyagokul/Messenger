import React from "react";

const Login = () => {
  return (
    <main className="flex flex-col md:items-center md:justify-center ml-10 h-[100vh] md:ml-0">
      <div className="flex flex-col items-center justify-center shadow-md bg-white rounded-md max-w-[70vw] px-10 py-4 mt-20 md:mt-0 md:px-20 md:py-5">
        <h4 className="text-3xl mb-3">Chatter</h4>
        <h4 className="text-sm mb-10">Login</h4>
        <form action="" className="flex flex-col items-center justify-center">
          <input
            type="email"
            name=""
            id=""
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email"
          />
          <input
            type="password"
            name=""
            id=""
            className="mb-5 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="password"
          />

          <button
            type="submit"
            className="m-4 bg-purple-400 px-4 py-1 rounded-md text-white hover:text-black hover:bg-purple-500"
          >
            Sign In
          </button>
          <p className="text-xs">
            You don't have an account?{" "}
            <span className="text-purple-400 cursor-pointer">Register</span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;