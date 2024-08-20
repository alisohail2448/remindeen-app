import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs, useNavigation } from "expo-router";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";

export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tabs tabBar={props => <TabBar {...props}/>} 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="black" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
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
