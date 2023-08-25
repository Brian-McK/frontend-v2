import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the shape of your context
interface IAuthContext {
  user: string | null;
  token: string | null;
  setLoggedIn: (user: string, token: string) => void;
  setLoggedOut: () => void;
}

// Create the context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Custom hook to access the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to wrap your app
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is logged in from previous sessions (e.g., using local storage)
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const setLoggedIn = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("username", user);
    localStorage.setItem("token", token);
    navigate("/dashboard/manage-employees");
  };

  const setLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const authContextValue: IAuthContext = {
    user,
    token,
    setLoggedIn,
    setLoggedOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
