import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    redhat: require("./../assets/fonts/RedHatDisplay-Regular.ttf"),
    "redhat-medium": require("./../assets/fonts/RedHatDisplay-Medium.ttf"),
    "redhat-bold": require("./../assets/fonts/RedHatDisplay-Bold.ttf"),
  });
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
