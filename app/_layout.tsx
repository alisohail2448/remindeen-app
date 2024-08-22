import store from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    inter: require("./../assets/fonts/Inter_24pt-Regular.ttf"),
    "inter-medium": require("./../assets/fonts/Inter_18pt-Medium.ttf"),
    "inter-bold": require("./../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <Provider store={store}>
        <AuthProvider>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: "#fbfbfb",
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </AuthProvider>
      </Provider>
    </ToastProvider>
  );
}
