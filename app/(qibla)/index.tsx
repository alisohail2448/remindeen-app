import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useEffect } from "react";
import QiblaCompass from "react-native-qibla-compass";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

export default function index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={{
        paddingTop: 40,
        padding: 16,
        // flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: "#FBFBFB",
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
            color: Colors.primary,
          }}
        >
          Qibla Finder
        </Text>
      </View>
      <View
        style={{
          marginTop: 40,
          backgroundColor: Colors.WHITE,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 10,
          padding: 20
        }}  
      >
        <QiblaCompass
          color={Colors.primary}
          backgroundColor={"#fff"}
          textStyles={{ textAlign: "center", fontSize: 24 }}
        />
      </View>
    </View>
  );
}
