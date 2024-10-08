import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
  Platform,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/auth";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { HADIS_DATA } from "@/constants/constants";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { getUserProfile } = useAuth();
  const router = useRouter();
  const user = useSelector((state) => state?.user);
  let [hadith, setHadith] = useState({});

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const hadithIndex = dayOfYear % HADIS_DATA.length;
    setHadith(HADIS_DATA[hadithIndex]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={
              user?.profilePic
                ? {
                    uri: user?.profilePic,
                  }
                : user?.role === "admin"
                ? require("../../assets/images/profile.jpg")
                : user?.role === "subadmin"
                ? require("../../assets/images/subprofile.jpg")
                : require("../../assets/images/user.jpg")
            }
          />
          <View style={{ gap: 5 }}>
            <Text style={styles.textTitle}>Assalam Alaikum!</Text>
            <Text style={styles.welcome}>
              Welcome Back{" "}
              <Text style={{ color: "#EAAF67", fontWeight: "bold" }}>
                {user?.name?.split(" ")[0]?.trim()}
              </Text>
            </Text>
          </View>
        </View>
        {/* <View>
            <Link href={"/notification"}>
              <Ionicons name="notifications" size={30} color="#EAAF67" />
            </Link>
          </View> */}
      </View>
      <View style={{ height: 200 }}>
        <Swiper loop={true} autoplay={true} showsPagination={false} loop>
          <View style={styles.imageStyle}>
            <View style={styles.qiblaFinder}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "inter",
                    fontWeight: "bold",
                  }}
                >
                  Face the Qibla
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "inter-medium" }}>
                  Begin Your
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "inter-medium" }}>
                  Prayer Journey
                </Text>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  style={styles.findBtn}
                  onPress={() => router.push("/(qibla)")}
                >
                  <Text style={styles.buttonText}>Find Qibla</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("../../assets/images/swiper.jpg")}
                style={{
                  width: 150,
                  height: 150,
                  position: "absolute",
                  right: 10,
                }}
              />
            </View>
          </View>
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
                  onPress={() => router.push("/(tasbih)")}
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
        </Swiper>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        style={{
          backgroundColor: Colors.WHITE,
          flex: 1,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <View style={{ padding: 20, paddingTop: 20, gap: 16 }}>
          <Pressable
            onPress={() => router.push("/(qibla)")}
            style={{
              backgroundColor: "#E3EEEC",
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              padding: 14,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Image
                source={require("../../assets/images/qibla.png")}
                style={{ width: 60, height: 60 }}
              />
              <View>
                <Text
                  style={{
                    fontFamily: "inter-bold",
                    color: Colors.primary,
                    fontSize: 18,
                  }}
                >
                  Qibla Finder
                </Text>
                <Text
                  style={{
                    fontFamily: "inter-medium",
                    color: Colors.primary,
                    fontSize: 14,
                  }}
                >
                  Right Direction for Your Prayers
                </Text>
              </View>
            </View>
            <Entypo name="chevron-right" size={20} color="#1C5153" />
          </Pressable>

          <Pressable
            onPress={() => router.push("/(tasbih)")}
            style={{
              backgroundColor: "#E3EEEC",
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              padding: 14,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Image
                source={require("../../assets/images/tasbih.png")}
                style={{ width: 50, height: 50 }}
              />
              <View>
                <Text
                  style={{
                    fontFamily: "inter-bold",
                    color: Colors.primary,
                    fontSize: 18,
                  }}
                >
                  Tasbih Counter
                </Text>
                <Text
                  style={{
                    fontFamily: "inter-medium",
                    color: Colors.primary,
                    fontSize: 14,
                  }}
                >
                  Track of Your Dhikr Effortlessly
                </Text>
              </View>
            </View>
            <Entypo name="chevron-right" size={20} color="#1C5153" />
          </Pressable>

          <View
            style={{
              // backgroundColor: "#fbfbfb",
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 10,
              padding: 14,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>Hadith Of The Day</Text>
              <Text style={styles.arabicText}>{hadith.arabic}</Text>
              <Text style={styles.englishText}>{hadith.english}</Text>
              <Text style={styles.source}>Source: {hadith.source}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#102A2B",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  profileContainer: {
    marginTop: 10,
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
  qiblaFinder: {
    width: "auto",
    height: 150,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 20,
    justifyContent: "center",
  },
  tasbeehCounter: {
    width: "auto",
    height: 150,
    margin: 10,
    backgroundColor: "#F6AF58",
    borderRadius: 13,
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
  findBtn: {
    paddingVertical: 6,
    paddingHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BLACK,
    borderRadius: 4,
    zIndex: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "inter-bold",
    color: "#1C5153",
    fontSize: 17,
    marginBottom: 8,
    textAlign: "center",
  },
  arabicText: {
    fontFamily: "arabic",
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  englishText: {
    fontFamily: "inter-medium",
    color: "#000",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  source: {
    fontFamily: "inter",
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
});
