import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator, Button, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { isCheckingToken, logout } = useAuth();

  if (isCheckingToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Redirect href="/auth/sign-in" />
  );
}