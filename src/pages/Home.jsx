import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="home h-[100vh] overflow-hidden">
      <div className="flex items-center justify-center p-3  mt-10 md:mt-0 md:p-20">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;