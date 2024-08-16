import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

export const useAuth = () => {
  const router = useRouter();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          router.push("/home");
          return;
        }
      }
    } catch (error) {
      console.log("Token verification failed", error);
    } finally {
      setIsCheckingToken(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      if (router.pathname !== "/auth/sign-in") {
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
  };


  useEffect(() => {
    checkToken();
  }, []);

  return { isCheckingToken, logout };
};