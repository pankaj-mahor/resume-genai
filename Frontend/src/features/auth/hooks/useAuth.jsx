import React from "react";
import { useAuthContext } from "../auth.context";

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetails,
} from "../services/auth.api";

const useAuth = () => {
  const { user, isLoading, setUser, setIsLoading } = useAuthContext();

  const handleRegister = async (username, email, password) => {
    try {
      setIsLoading(true);
      const response = await registerUser(username, email, password);
      setUser(response.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await loginUser(email, password);
      setUser(response.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getUserDetails();
      setUser(response.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetUserDetails,
  };
};

export default useAuth;
