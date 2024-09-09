import { View, Text, Dimensions, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useAuth } from "../context/auth";
import { getMyAdmin } from "@/services/profile";
import { isAdmin } from "@/utils/helper";

export default function Index() {
  const router = useRouter();
  const user = useSelector((state) => state?.user);
  const { token } = useAuth();
  const [admin, setAdmin] = useState();

  const getAdmin = async () => {
    if (!token) return;
    if (user?.role === "admin") return;
    try {
      const data = await getMyAdmin(token, user?._id);
      if (data.data) {
        setAdmin(data.data);
      }
      console.log("dataa", data);
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [user, token]);

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            // alignItems: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "inter-bold",
              color: Colors.primary,
            }}
          >
            Chats
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 10,
          marginTop: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "inter-medium",
            color: Colors.primary,
          }}
        >
          Discussion Group
        </Text>

        <Pressable
          onPress={() => router.push("/(chats)")}
          style={{
            backgroundColor: "#E3EEEC",
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 10,
            marginTop: 20,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <MaterialIcons name="groups" size={30} color={Colors.primary} />
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "inter-bold",
                color: Colors.primary,
              }}
            >
              {isAdmin(user?.role)
                ? user?.mosqueName
                  ? user?.mosqueName
                  : user?.name
                : admin?.mosqueName
                ? admin?.mosqueName
                : admin?.name}{" "} Group
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.primary,
              }}
            >
              By {isAdmin(user?.role) ? user?.name : admin?.name}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
