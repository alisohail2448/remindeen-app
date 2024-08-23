import { View, Text, Pressable, SafeAreaView, Dimensions, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ProfileDetails from "@/components/ProfileDetails";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} 
      style={{
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        padding: 16,
        // flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: "#FBFBFB",
        marginBottom: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* <Pressable
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#e3eeec",
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Feather name="arrow-left" size={24} color="#004B40" />
          </Pressable> */}
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
        <Pressable
          onPress={() => router.push("/(profile)/edit")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#e3eeec",
            padding: 8,
            paddingHorizontal: 16,
            borderRadius: 100,
            gap: 6,
          }}
        >
          <FontAwesome6 name="edit" size={20} color={Colors.primary} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: "inter-medium",
              color: Colors.primary,
            }}
          >
            Edit
          </Text>
        </Pressable>
      </View>
      <ProfileDetails />
    </ScrollView>
  );
}
