import React from "react";

const Search = () => {
  return (
    <div className="px-3">
      <input
        type="text"
        placeholder="find a user"
        className="bg-transparent  border-b-2  border-slate-400 outline-none px-2 caret-purple-500 mt-3"
      />
    </div>
  );
};

export default Search;
