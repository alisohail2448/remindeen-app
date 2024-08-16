import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  // const { logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <TouchableOpacity onPress={() => router.push('/profile')} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image 
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={require("../../assets/images/profile.png")}
          />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 18, fontFamily: "redhat-medium" }}>
            Assalam Alaikum!
          </Text>
          <Text style={{ fontSize: 14, fontFamily: "redhat" }}>
            Welcome Back!
          </Text>
        </View>
        {/* <Button onPress={logout} title="Logout" /> */}
      </TouchableOpacity>
    </View>
  );
}
