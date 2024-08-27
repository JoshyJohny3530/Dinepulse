import React, { createContext, useState, useContext, useEffect } from "react";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserName(user.displayName);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        userName,
        setIsLoggedIn,
        setUserName,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
