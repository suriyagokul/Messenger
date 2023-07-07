import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="w-[40%] h-[80vh] lg:w-[30%] border-none rounded-md bg-slate-500">
      <Navbar />
      <Search />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
};

export default Sidebar;
