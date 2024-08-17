import React from "react";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function LaunchScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/remindeen.png")}
        style={{
          width: 250,
          height: 150,
          objectFit: "contain",
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontFamily: "inter",
          fontSize: 16,
          textAlign: "center",
          color: "#000",
        }}
      >
        Receive Timely Reminders for Prayers, Quranic Verses, Hadiths, and
        Islamic Teachings to Guide Your Spiritual Journey
      </Text>
      {/* <TouchableOpacity
        onPress={() => router.push("/auth/sign-in")}
        style={styles.button}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "inter",
            textAlign: "center",
            fontSize: 17,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    marginTop: 40,
  },
});
