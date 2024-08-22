import {
  View,
  Text,
  Pressable,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { getRelativeTime, isAdmin } from "@/utils/helper";
import { useAuth } from "../context/auth";
import { getMyAdmin, getUser } from "@/services/profile";
import { getMessages } from "@/services/messages";

export default function index() {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.user);
  const { token } = useAuth();
  const [admin, setAdmin] = useState();
  const [groupMessages, setGroupMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getAdmin = async () => {
    if (!token) return;
    if (user?.role === "admin") return;
    try {
      const data = await getMyAdmin(token, user?._id);
      if (data.data) {
        setAdmin(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [user, token]);

  const getUserMessages = async () => {
    setIsLoading(true);
    if (!token) return;
    const adminId = user?.role === "admin" ? user?._id : admin?._id;
    try {
      const data = await getMessages(token, adminId);
      if (data?.messages) {
        setGroupMessages(data?.messages);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserMessages();
  }, [user, token, admin]);

  const renderMessage = ({ item }) => {
    const isUserMessage = item.sender?._id === user?._id;
    return (
      <View
        style={{
          alignSelf: isUserMessage ? "flex-end" : "flex-start",
          gap: 3,
        }}
      >
        {isUserMessage ? (
          <Text
            style={{
              color: Colors.primary,
              fontSize: 15,
              fontFamily: "inter-medium",
              textAlign: "right",
            }}
          >
            Me
          </Text>
        ) : (
          <Text
            style={{
              color: Colors.primary,
              fontSize: 15,
              fontFamily: "inter-medium",
            }}
          >
            {item?.sender?.name}
          </Text>
        )}
        <View
          style={{
            backgroundColor: isUserMessage ? Colors.primary : "#E8ECEB",
            paddingVertical: 4,
            paddingHorizontal: 10,
            // borderRadius: 6,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: isUserMessage ? 6 : 0,
            borderBottomRightRadius: !isUserMessage ? 6 : 0,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isUserMessage ? Colors.WHITE : Colors.primary,
              fontFamily: "inter",
            }}
          >
            {item?.content}
          </Text>
          <Text
            style={{
              color: isUserMessage ? "#BFBCBC" : "#888",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {getRelativeTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 10,
          backgroundColor: "#FBFBFB",
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
              {isAdmin(user?.role)
                ? user?.mosqueName
                  ? user?.mosqueName
                  : user?.name
                : admin?.mosqueName
                ? admin?.mosqueName
                : admin?.name}{" "}
              Group
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#f8f8f8" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={30}
      >
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={groupMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item?._id}
            contentContainerStyle={{ padding: 16, paddingBottom: 80, gap: 16 }}
          />
        )}

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TextInput
              style={{
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 8,
                fontSize: 16,
                fontFamily: "inter-medium",
                borderWidth: 1,
                borderColor: Colors.primary,
                backgroundColor: Colors.WHITE,
                color: Colors.primary,
                flex: 1,
              }}
              placeholder="Type a message"
              multiline={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Ionicons name="send" size={26} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
