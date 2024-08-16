import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <View>
        <Text style={{ fontSize: 20, fontFamily: "redhat-bold" }}>Profile</Text>
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
