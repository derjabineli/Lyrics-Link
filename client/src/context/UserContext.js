import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userContext, setUserContext] = useState({});

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {props.children}
    </UserContext.Provider>
  );
};
