import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="black" />
            ) : (
                <Ionicons name="home-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={20} color="black" />
            ) : (
              <FontAwesome5 name="user" size={20} color="black" />
            ),
          //   title: "Settings",
          //   headerTitleAlign: "center",
          //   headerTitle: "Settings",
          //   headerStyle: { backgroundColor: "#FF6464" },
          //   headerTintColor: "#fff",
        }}
      />
    </Tabs>
  );
};
