import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {jwtDecode} from "jwt-decode";


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);

          if (decodedToken.exp * 1000 > Date.now()) {
            router.push("/home");
          } 
        }
      } catch (error) {
        console.log("Token verification failed", error);
      }
    };

    checkToken();
  }, []);


  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Image
        source={require("../assets/images/mosque.jpg")}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
          marginTop: 40,
        }}
      />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/remindeen.png")}
          style={{
            width: 250,
            height: 50,
            // objectFit: "contain",
            marginTop: 20,
          }}
        />
        <Text
          style={{
            fontFamily: "redhat",
            fontSize: 16,
            textAlign: "center",
            color: "#000",
          }}
        >
          Receive Timely Reminders for Prayers, Quranic Verses, Hadiths, and
          Islamic Teachings to Guide Your Spiritual Journey
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/sign-in")}
          style={styles.button}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "redhat",
              textAlign: "center",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: -20,
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    alignItems: "center",
    gap: 40,
  },
  button: {
    padding: 15,
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    marginTop: 40,
  },
});
