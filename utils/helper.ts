import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { router } from "expo-router";

export const isTokenExpired = async (token) => {
  if (!token) {
    await AsyncStorage.removeItem("jwtToken");
    router.push("/auth/sign-in");
    return true;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    await AsyncStorage.removeItem("jwtToken");
    router.push("/auth/sign-in");
    return true;
  }

  return false;
};

export const isAdmin = (role) => {
  return role === "admin";
};


export const getRelativeTime = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - messageDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};