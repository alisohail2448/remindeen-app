import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ProfileDetails from "@/components/ProfileDetails";
import { useSelector } from "react-redux";
import MemberCard from "@/components/MemberCard";
import { useAuth } from "../context/auth";
import {
  getMyAdmin,
  getRegularusers,
  getSubAdmin,
  getUser,
} from "@/services/profile";
import { isAdmin } from "@/utils/helper";
import AddMemberDialog from "@/components/AddMemberDialog";

export default function Index() {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.user);
  const { token, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [subAdmin, setSubAdmin] = useState({});
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(user);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getSubAdminForCommunity = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await getSubAdmin(token, admin?._id);
      if (data.data) {
        setSubAdmin(data.data[0]);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      getSubAdminForCommunity();
      getUsers();
    }
  }, [admin]);

  const getUsers = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await getRegularusers(token, admin?._id);
      if (data.data) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAdmin = async () => {
    if (!token || !userId) return;
    setIsLoading(true);
    try {
      const data = await getMyAdmin(token, userId);
      if (data.data) {
        setAdmin(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  if (isLoading)
    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={Colors.primary} size={40} />
      </View>
    );

  return (
    <>
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
              Community
            </Text>
            {isAdmin(user?.role) ? (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                }}
              >
                Manage Members
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                }}
              >
                Your community
              </Text>
            )}
          </View>
          {isAdmin(user?.role) && (
            <Pressable
              onPress={() => setOpenAddDialog(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.primary,
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
                gap: 6,
              }}
            >
              <FontAwesome6 name="add" size={18} color={Colors.WHITE} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "inter-medium",
                  color: Colors.WHITE,
                }}
              >
                Add Member
              </Text>
            </Pressable>
          )}
        </View>
        <SafeAreaView>
          <View>
            <Pressable
              onPress={() =>
                isAdmin(user?.role)
                  ? router.push("/(tabs)/profile")
                  : router.push(`/(user)/${admin?._id}`)
              }
              style={{
                backgroundColor: Colors.WHITE,
                borderWidth: 2,
                borderColor: "#eee",
                borderRadius: 10,
                marginTop: 20,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                  source={
                    admin?.profilePic
                      ? {
                          uri: admin?.profilePic,
                        }
                      : require("../../assets/images/profile.jpg")
                  }
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
                        fontFamily: "inter-bold",
                        color: Colors.primary,
                      }}
                    >
                      {admin?.name}
                    </Text>
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
                      {admin?.role}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "inter-medium",
                      color: "#1C5153",
                    }}
                  >
                    {admin?.designation}
                  </Text>
                </View>
              </View>
              <Entypo name="chevron-right" size={20} color="#1C5153" />
            </Pressable>

            {subAdmin && (
              <Pressable
                onPress={() => router.push(`/(user)/${subAdmin?._id}`)}
                style={{
                  backgroundColor: Colors.WHITE,
                  borderWidth: 2,
                  borderColor: "#eee",
                  borderRadius: 10,
                  marginTop: 20,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 100 }}
                    source={
                      subAdmin?.profilePic
                        ? {
                            uri: subAdmin?.profilePic,
                          }
                        : require("../../assets/images/subprofile.jpg")
                    }
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
                          fontFamily: "inter-bold",
                          color: Colors.primary,
                        }}
                      >
                        {subAdmin?.name}
                      </Text>
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
                        {subAdmin?.role === "subadmin" && "Sub Admin"}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "inter-medium",
                        color: "#1C5153",
                      }}
                    >
                      {subAdmin?.designation}
                    </Text>
                  </View>
                </View>
                <Entypo name="chevron-right" size={20} color="#1C5153" />
              </Pressable>
            )}
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-bold",
                color: Colors.primary,
                marginTop: 20,
              }}
            >
              Members
            </Text>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 10,
                marginTop: 6,
                paddingHorizontal: 10,
                flexDirection: "column",
              }}
            >
              {users?.length > 0 ? (
                users?.map((regularUser, index, arr) => (
                  <MemberCard
                    key={regularUser?._id}
                    user={regularUser}
                    index={index}
                    array={arr}
                  />
                ))
              ) : (
                <Text>There are no users!</Text>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
      <AddMemberDialog
        modalVisible={openAddDialog}
        setModalVisible={setOpenAddDialog}
        fetchUsers={getUsers}
      />
    </>
  );
}
