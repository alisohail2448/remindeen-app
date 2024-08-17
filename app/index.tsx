import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator, Button, View } from "react-native";
import LaunchScreen from "@/components/LaunchScreen";

export default function Index() {
  const router = useRouter();
  const { isCheckingToken, logout } = useAuth();

  if (isCheckingToken) {
    return <LaunchScreen />;
  }

  return <Redirect href="/auth/sign-in" />;
}
