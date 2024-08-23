import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/app/context/auth";
import { getUser, removeUser } from "@/services/profile";
import ImageView from "react-native-image-viewing";
import { isAdmin } from "@/utils/helper";
import { useSelector } from "react-redux";
import RemoveUserDialog from "@/components/RemoveUserDialog";
import { useToast } from "react-native-toast-notifications";

export default function index() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const toast = useToast();
  const appUser = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getUserById = async () => {
    if (!token || !id) return;
    setIsLoading(true);
    try {
      const data = await getUser(token, id);
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Failed to fetch sub admin", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  const handleRemoveAccount = async () => {
    setIsRemoving(true);
    try {
      const data = await removeUser(token, id, appUser?._id);
      if (data.status === 200) {
        toast.show("User removed successfully", {
          type: "normal",
        });
        setOpenRemoveDialog(false);
        navigation.goBack();
      } else {
        toast.show(data?.msg || "Failed to remove user", {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("An error occurred. Please try again later.", {
        type: "danger",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <View>
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 60 : 40,
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
              User Details
            </Text>
          </View>
        </View>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get("window").height * 0.8,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={Colors.primary} size={40} />
          </View>
        ) : (
          <>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                borderWidth: 2,
                borderColor: "#eee",
                borderRadius: 10,
                padding: 16,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: Colors.primary,
                    padding: 5,
                    borderRadius: 100,
                    borderStyle: "dashed",
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 100 }}
                    source={
                      user?.profilePic
                        ? {
                            uri: user?.profilePic,
                          }
                        : require("../../../assets/images/subprofile.jpg")
                    }
                  />
                </View>
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
                        fontSize: 18,
                        fontFamily: "inter-bold",
                        color: Colors.primary,
                      }}
                    >
                      {user?.name}
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
                        paddingHorizontal: 10,
                      }}
                    >
                      {user?.role === "subadmin" ? "Sub Admin" : "Member"}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.primary,
                    }}
                  >
                    {user?.designation}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  gap: 15,
                }}
              >
                <View style={{ gap: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "inter",
                      color: "#5D8082",
                    }}
                  >
                    Phone
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.BLACK,
                    }}
                  >
                    {user?.phone}
                  </Text>
                </View>
                <View style={{ gap: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "inter",
                      color: "#5D8082",
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.BLACK,
                    }}
                  >
                    {user?.email}
                  </Text>
                </View>
                <View style={{ gap: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "inter",
                      color: "#5D8082",
                    }}
                  >
                    Mosque Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.BLACK,
                    }}
                  >
                    {user?.mosqueName}
                  </Text>
                </View>
                <View style={{ gap: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "inter",
                      color: "#5D8082",
                    }}
                  >
                    Mosque Area
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.BLACK,
                    }}
                  >
                    {user?.mosqueArea}
                  </Text>
                </View>
              </View>

              {isAdmin(user?.role) && (
                <View
                  style={{
                    marginTop: 20,
                    gap: 15,
                    backgroundColor: Colors.WHITE,
                    borderWidth: 2,
                    borderColor: "#eee",
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <Pressable
                    onPress={() => setUpiCollapse(!upiCollapse)}
                    style={{
                      gap: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "inter-bold",
                        color: Colors.primary,
                      }}
                    >
                      UPI Details
                    </Text>
                    {upiCollapse ? (
                      <Feather
                        name="chevron-up"
                        size={24}
                        color={Colors.primary}
                      />
                    ) : (
                      <Feather
                        name="chevron-down"
                        size={24}
                        color={Colors.primary}
                      />
                    )}
                  </Pressable>
                  {upiCollapse && (
                    <>
                      <View
                        style={{
                          gap: 4,
                        }}
                      >
                        {!user?.upi?.id && !user?.upi?.qr && (
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "inter",
                              color: Colors.BLACK,
                            }}
                          >
                            There is no upi details! Add the details.
                          </Text>
                        )}
                        {user?.upi?.id && (
                          <>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "inter",
                                color: "#5D8082",
                              }}
                            >
                              UPI Id
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: "#e3eeec",
                                  borderRadius: 12,
                                  paddingVertical: 8,
                                  paddingHorizontal: 14,
                                  overflow: "hidden", 
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: "inter-medium",
                                    color: Colors.primary,
                                  }}
                                >
                                  {user?.upi?.id}
                                </Text>
                              </View>
                              <FontAwesome6
                                name="copy"
                                size={20}
                                color="black"
                              />
                            </View>
                          </>
                        )}
                      </View>
                      <View style={{ gap: 4, marginTop: 10 }}>
                        {user?.upi?.qr && (
                          <>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "inter",
                                color: "#5D8082",
                              }}
                            >
                              UPI QR
                            </Text>
                            <TouchableOpacity
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => setIsVisible(true)}
                            >
                              <Image
                                source={{
                                  uri: user?.upi?.qr,
                                }}
                                style={{
                                  width: 200,
                                  height: 200,
                                  objectFit: "contain",
                                }}
                              />
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>
            {isAdmin(appUser?.role) && (
              <View>
                <Pressable
                  onPress={() => setOpenRemoveDialog(true)}
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: Colors.primary,
                    padding: 8,
                    paddingHorizontal: 16,
                    borderRadius: 6,
                    gap: 6,
                    marginTop: 20,
                  }}
                  disabled={isRemoving}
                >
                  <Ionicons
                    name="person-remove-outline"
                    size={20}
                    color={Colors.WHITE}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "inter-medium",
                      color: Colors.WHITE,
                    }}
                  >
                    {isRemoving ? "Removing..." : "Remove User"}
                  </Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </View>

      {user?.upi?.qr && (
        <ImageView
          images={[
            {
              uri: user?.upi?.qr,
            },
          ]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      )}
      <RemoveUserDialog
        modalVisible={openRemoveDialog}
        setModalVisible={setOpenRemoveDialog}
        handleRemoveAccount={handleRemoveAccount}
      />
    </View>
  );
}
