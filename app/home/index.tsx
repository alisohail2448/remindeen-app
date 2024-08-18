import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";

const images = [
  require("../../assets/images/MaskGroup.png"),
  require("../../assets/images/MaskGroup.png"),
  require("../../assets/images/MaskGroup.png"),
];

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            style={styles.profilePic}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={require("../../assets/images/profile.png")}
            />
            <View style={{ gap: 5 }}>
              <Text style={styles.textTitle}>Assalam Alaikum!</Text>
              <Text style={styles.welcome}>Welcome Back! John </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Link href={"/notification"}>
              <Ionicons name="notifications" size={30} color="#EAAF67" />
            </Link>
          </View>
        </View>
        <Swiper
          loop={true}
          autoplay={true}
          showsPagination={false}
          // dotColor="#fff"
          // activeDotColor="#000"
        >
          {images.map((image, index) =>
            index === 0 ? (
              <View style={styles.imageStyle}>
                <View style={styles.tasbeehCounter}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontFamily: "inter" }}>
                      Remember Allah
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "inter",
                        fontWeight: "bold",
                        width: 150,
                      }}
                    >
                      Start Tasbih Counter
                    </Text>
                  </View>
                  <View style={{ marginTop: 30 }}>
                    <TouchableOpacity
                      style={styles.getStartedBtn}
                      onPress={() => router.push("/tasbih")}
                    >
                      <Text style={styles.buttonText}>Get Start Now</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require("../../assets/images/MaskGroup.png")}
                    style={{
                      width: 150,
                      height: 150,
                      position: "absolute",
                      right: 0,
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.imageStyle}>
                <View style={styles.tasbeehCounter}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontFamily: "inter" }}>
                      Remember Allah
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "inter",
                        fontWeight: "bold",
                        width: 150,
                      }}
                    >
                      Start This
                    </Text>
                  </View>
                  <View style={{ marginTop: 30 }}>
                    <TouchableOpacity
                      style={styles.getStartedBtn}
                      onPress={() => router.push("/tasbih")}
                    >
                      <Text style={styles.buttonText}>Get Start Now</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require("../../assets/images/MaskGroup.png")}
                    style={{
                      width: 150,
                      height: 150,
                      position: "absolute",
                      right: 0,
                    }}
                  />
                </View>
              </View>
            )
          )}
        </Swiper>
        <View>
          <Text>Footer Section</Text>
        </View>
      </View>
      <View></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#102A2B",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  profileContainer: {
    marginTop: 26,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    alignItems: "center",
  },
  profilePic: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: 192,
    height: 50,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "inter-medium",
    color: "#FFFFFF",
  },
  welcome: {
    fontSize: 14,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
  userText: {
    fontSize: 10,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
  tasbeehCounter: {
    width: "auto",
    height: 150,
    margin: 10,
    backgroundColor: "#F6AF58",
    borderRadius: 13,
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  imageStyle: {
    // width: 150,
    // height: 150,
    resizeMode: "cover",
    // position: "absolute",
    // left: 290,
    // top: 50,
  },
  getStartedBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C5153",
    borderRadius: 8,
    zIndex: 10,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
});
