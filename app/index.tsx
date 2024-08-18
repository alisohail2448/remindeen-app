import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import LaunchScreen from "@/components/LaunchScreen";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "@/services/profile";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isCheckingToken, userId, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const data = await getUser(token, userId);
      console.log("data", data)
      if(data.user){
        dispatch({
          type: 'SET_SPATIAL_USER',
          payload: data.user,
        })
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(token && userId) getUserProfile();
  }, [token, userId])

  if (isCheckingToken && loading) {
    return <LaunchScreen />;
  }
  

  return <Redirect href="/auth/sign-in" />;
}
