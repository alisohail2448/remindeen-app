import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export default function Index() {
  const router = useRouter();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
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
      }
      setIsCheckingToken(false);
    };

    checkToken();
  }, []);

  if (isCheckingToken) {
    return null; 
  }

  return <Redirect href="/auth/sign-in" />;
}

