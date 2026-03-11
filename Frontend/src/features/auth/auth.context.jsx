import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const response = await getUserDetails();
        console.log(response);
        setUser(response?.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
