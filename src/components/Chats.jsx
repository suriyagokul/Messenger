import React from "react";

const Chats = () => {
  return (
    <div className="flex items-center p-3 mt-3 h-16  hover:bg-slate-700 cursor-pointer hover:scale-y-105 ease-in duration-300">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/243/119/616/bollywood-celebrities-male-celebrities-wallpaper-preview.jpg"
        className="rounded-full w-[50px] h-[50px] object-cover object-center mr-4"
        alt=""
      />
      <p className="text-sm text-white">Prabhas</p>
    </div>
  );
};
  
export default Chats;
