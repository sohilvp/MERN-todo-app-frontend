import React, { createContext, useState } from "react";

export const AuthUser = createContext({});
const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({id:'',name:'',accessToken:''});
  return (
    <AuthUser.Provider value={{ auth, setAuth }}>{children}</AuthUser.Provider>
  );
};
export default AuthContext;
