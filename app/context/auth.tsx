import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { getUser } from "@/services/profile";

// Define the context type
interface AuthContextType {
  signIn: (token: string) => void;
  signOut: () => void;
  userId?: string;
  token?: string;
  isLoading: boolean;
  getUserProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthHook() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("jwtToken");
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          if (decodedToken.exp * 1000 > Date.now()) {
            setToken(storedToken);
            setUserId(decodedToken.id);
            await getUserProfile(); 
            router.push("/home");
          } else {
            await AsyncStorage.removeItem("jwtToken");
            router.push("/auth/sign-in");
          }
        } else {
          router.push("/auth/sign-in");
        }
      } catch (error) {
        console.log("Token verification failed", error);
        router.push("/auth/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router]);

  const signIn = async (newToken: string) => {
    try {
      await AsyncStorage.setItem("jwtToken", newToken);
      const decodedToken = jwtDecode(newToken);
      setToken(newToken);
      setUserId(decodedToken.id);
      await getUserProfile();
      router.push("/home");
    } catch (error) {
      console.log("Sign-in failed", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      setToken(undefined);
      setUserId(undefined);
      dispatch({
        type: "SET_SPATIAL_USER",
        payload: null,
      });
      router.push("/auth/sign-in");
    } catch (error) {
      console.log("Sign-out failed", error);
    }
  };

  const getUserProfile = async () => {
    if (!token || !userId) return;
    setIsLoading(true);
    try {
      const data = await getUser(token, userId);
      console.log("dattaa", data)
      if (data.user) {
        dispatch({
          type: "SET_SPATIAL_USER",
          payload: data.user,
        });
      }
    } catch (error) {
      console.log("Failed to fetch user profile", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, userId, token, isLoading, getUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

