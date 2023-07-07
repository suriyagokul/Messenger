import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-slate-700 p-3 ">
      <h4 className="text-white text-md font-bold text-purple-300">Chatter</h4>
      <div className="flex items-center">
        <img
          src="https://images.news18.com/ibnlive/uploads/2022/07/allu-arjun-1.jpg"
          alt="img"
          className="hidden md:block rounded-xl w-7 h-7 cursor-pointer"
        />
        <h4 className="hidden md:block text-xs ml-2 mr-2 text-white font-light">
          Suriya
        </h4>
        <button className="px-1 h-6 bg-purple-500 text-white rounded-md text-xs hover:bg-purple-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
