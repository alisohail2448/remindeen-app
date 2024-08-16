import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#e3eeec", borderRadius: 100, padding: 5 }}
        >
          <Feather name="arrow-left" size={24} color="#004B40" />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 20, fontFamily: "redhat-bold", color: "#004B40" }}
        >
          Profile
        </Text>
      </View>
      <View>
        <Image
          style={{ width: 100, height: 100, borderRadius: 100 }}
          source={require("../../assets/images/profile.png")}
        />
      </View>
    </View>
  );
}
