import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { useSelector } from "react-redux";
import { useAuth } from "@/app/context/auth";

export default function ProfileDetails() {
  const user = useSelector((state) => state?.user);
  const { signOut } = useAuth();
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);

  return (
    <View style={{ marginBottom: 50 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: Colors.WHITE,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 10,
          padding: 12,
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
                : user?.role === "admin"
                ? require("../assets/images/profile.jpg")
                : user?.role === "subadmin"
                ? require("../assets/images/subprofile.jpg")
                : require("../assets/images/user.jpg")
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
            <View
              style={{
                backgroundColor: "#e3eeec",
                borderRadius: 12,
                paddingVertical: 1,
                paddingHorizontal: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                  textTransform: "capitalize",
                }}
              >
                {user?.role}
              </Text>
            </View>
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
          backgroundColor: Colors.WHITE,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 10,
          padding: 16,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "inter-bold",
              color: Colors.primary,
            }}
          >
            Basic Details
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
            <Feather name="chevron-up" size={24} color={Colors.primary} />
          ) : (
            <Feather name="chevron-down" size={24} color={Colors.primary} />
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
                    <FontAwesome6 name="copy" size={20} color="black" />
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
                    style={{ justifyContent: "center", alignItems: "center" }}
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

      <View
        style={{
          marginTop: 20,
          gap: 15,
          backgroundColor: Colors.WHITE,
          borderWidth: 2,
          borderColor: "#eee",
          borderRadius: 10,
          padding: 16,
          marginBottom: 40,
        }}
      >
        <Pressable
          onPress={signOut}
          style={{
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="logout" size={18} color={Colors.primary} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "inter-bold",
              color: Colors.primary,
            }}
          >
            Sign Out
          </Text>
        </Pressable>
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
    </View>
  );
}
