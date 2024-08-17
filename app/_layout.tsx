import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "inter": require("./../assets/fonts/Inter_24pt-Regular.ttf"),
    "inter-medium": require("./../assets/fonts/Inter_18pt-Medium.ttf"),
    "inter-bold": require("./../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
