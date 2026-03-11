import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function registerUser({ username, email, password }) {
  try {
    const response = await axiosInstance.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axiosInstance.post("/api/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserDetails() {
  try {
    const response = await axiosInstance.get("/api/auth/me");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
