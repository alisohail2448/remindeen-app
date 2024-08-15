import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    redhat: require("./../assets/fonts/RedHatDisplay-Regular.ttf"),
    "redhat-medium": require("./../assets/fonts/RedHatDisplay-Medium.ttf"),
    "redhat-bold": require("./../assets/fonts/RedHatDisplay-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
