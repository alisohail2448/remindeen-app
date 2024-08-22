import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function MemberCard({ user, index, array }) {
  const router = useRouter();
  const appUser = useSelector((state) => state?.user);
  return (
    <Pressable
      onPress={() => router.push(`/(user)/${user?._id}`)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: index !== array.length - 1 ? 1 : 0,
        borderBottomColor: "#eee",
        paddingVertical: 10,
        // marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 100 }}
          source={{
            uri: user?.profilePic ?  user?.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
          }}
        />
        <View style={{ gap: 4 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "inter-medium",
                color: Colors.primary,
              }}
            >
              {user?.name}
            </Text>
            {user?._id === appUser?._id && (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                  textTransform: "capitalize",
                  backgroundColor: "#e3eeec",
                  borderRadius: 12,
                  paddingVertical: 1,
                  paddingHorizontal: 14,
                }}
              >
                me
              </Text>
            )}
          </View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "inter",
              color: "#1C5153",
            }}
          >
            {user?.phone}
          </Text>
        </View>
      </View>
      <Entypo name="chevron-right" size={20} color="#1C5153" />
    </Pressable>
  );
}
