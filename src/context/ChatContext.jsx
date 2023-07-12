import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { authContext } from "../context/AuthContext";

export const chatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const currentUser = useContext(authContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid > action.payload?.uid
              ? currentUser?.uid + action.payload?.uid
              : action.payload?.uid + currentUser?.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <chatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </chatContext.Provider>
  );
};

export default ChatContextProvider;
