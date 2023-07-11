import React from "react";
import "../App.css";

export default function Message() {
  return (
    <div className="flex items-center  mb-3 owner">
      <div className="flex flex-col items-center mr-0 md:mr-3">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="w-[20px] h-[20px] ml-[-3px] md:w-[50px] md:h-[50px] object-cover rounded-full"
        />
        <span className="text-xs md:text-xs">Just Now</span>
      </div>
      <div className="messgeContent mb-3 w-[55%]  md:w-[30%]">
        <span className="bg-violet-400 drop-shadow-md text-white text-xs md:text-none rounded-md md:rounded-t-3xl md:rounded-r-sm px-1 md:px-5 py-1 ">
          hello everyon
        </span>
        {/* <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className=" object-contain  mt-3"
        /> */}
      </div>
    </div>
  );
}
