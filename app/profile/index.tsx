import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ImageView from "react-native-image-viewing";

export default function Index() {
  const navigation = useNavigation();
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#e3eeec", borderRadius: 100, padding: 5 }}
        >
          <Feather name="arrow-left" size={24} color="#004B40" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "inter-bold",
            color: Colors.primary,
          }}
        >
          Profile
        </Text>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <Image
            style={{ width: 70, height: 70, borderRadius: 100 }}
            source={require("../../assets/images/profile.png")}
          />
          <View style={{ gap: 4 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "inter-bold",
                  color: Colors.primary,
                }}
              >
                Sohail Akhtar Ali
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                  textTransform: "capitalize",
                  backgroundColor: "#D0DED8",
                  borderRadius: 12,
                  paddingVertical: 1,
                  paddingHorizontal: 14,
                }}
              >
                admin
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.primary,
              }}
            >
              Developer
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, gap: 15 }}>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              Phone
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.BLACK,
              }}
            >
              +91 7249047105
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.BLACK,
              }}
            >
              maulana@gmail.com
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              Mosque Name
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.BLACK,
              }}
            >
              Minara Masjid
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              Mosque Area
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.BLACK,
              }}
            >
              Gazi Plot Hiwarkhed Road Akot
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, gap: 10 }}>
          <View style={{ gap: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-bold",
                color: Colors.primary,
              }}
            >
              UPI Section
            </Text>
          </View>
          <View style={{ gap: 4 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              UPI Id
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                  backgroundColor: "#D0DED8",
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                }}
              >
                7249048715@ybl
              </Text>
              <FontAwesome6 name="copy" size={20} color="black" />
            </View>
          </View>
          <View style={{ gap: 4, marginTop: 10 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
            >
              UPI QR
            </Text>
            <TouchableOpacity onPress={() => setIsVisible(true)} >
              <Image
                source={{
                  uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
                }}
                style={{ width: 200, height: 200, objectFit: "contain" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ImageView
          images={[
            {
              uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
            },
          ]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
    </View>
  );
}
