import {
  View,
  Text,
  Dimensions,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import TasbihCounter from "@/components/TasbihCounter";

export default function index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 60 : 40,
          padding: 16,
          height: Dimensions.get("window").height,
          backgroundColor: "#102A2B",
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#e3eeec",
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Feather name="arrow-left" size={24} color={Colors.primary} />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "inter-bold",
              color: "#FBFBFB",
            }}
          >
            Tasbih Counter
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <TasbihCounter />
        </View>
      </View>
    </>
  );
}
