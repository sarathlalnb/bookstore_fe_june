import React, { createContext, useState } from "react";


// creates a context, the state will be stored and will be managed through AuthContext- this will be provided to the whole application
export const AuthContext = createContext();

// we will wrap the app with the context provider so the app will be inside the provider - here children means the app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // saveToken , token, removeToken

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
