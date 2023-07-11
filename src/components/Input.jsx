import React from "react";
import "../App.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export default function Input() {
  return (
    <div className="bg-white h-20 w-[100%] p-3 flex md:justify-between md:items-center">
      <textarea
        type="text"
        placeholder="Type Something..."
        className="outline-none caret-purple-500 border-none w-[40%] mt-4 overflow-x-hidden overflow-y-scroll plcaeholder:text-gray-500"
        style={{
          resize: "none",
        }}
      ></textarea>
      <div className="flex items-center justify-between w-[20%]">
        <AttachFileIcon className="text-purple-500 cursor-pointer" />
        <input className="hidden " type="file" id="file" />
        <label htmlFor="file" className="cursor-pointer">
          <AddPhotoAlternateOutlinedIcon className="text-purple-500" />
        </label>
        <button className="bg-purple-400 cursor-pointer text-white rounded-md px-3 hover:bg-purple-500">
          send
        </button>
      </div>
    </div>
  );
}
