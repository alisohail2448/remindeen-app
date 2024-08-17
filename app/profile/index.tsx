import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ImageView from "react-native-image-viewing";

export default function Index() {
  const navigation = useNavigation();
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={{
        marginTop: 40,
        padding: 16,
        backgroundColor: "#FBFBFB",
        height: "100%",
        marginBottom: 40,
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#e3eeec",
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Feather name="arrow-left" size={24} color="#004B40" />
          </TouchableOpacity>
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
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            backgroundColor: Colors.WHITE,
            borderWidth: 2,
            borderColor: "#eee",
            borderRadius: 10,
            padding: 16,
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
              style={{ width: 70, height: 70, borderRadius: 100 }}
              source={require("../../assets/images/profile.png")}
            />
          </View>
          <View style={{ gap: 4 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "inter-bold",
                  color: Colors.primary,
                }}
              >
                Sohail Akhtar Ali
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "inter-medium",
                  color: Colors.primary,
                  textTransform: "capitalize",
                  backgroundColor: "#e3eeec",
                  borderRadius: 12,
                  paddingVertical: 1,
                  paddingHorizontal: 14,
                }}
              >
                admin
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter-medium",
                color: Colors.primary,
              }}
            >
              Developer
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
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
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
              +91 7249047105
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
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
              maulana@gmail.com
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
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
              Minara Masjid
            </Text>
          </View>
          <View style={{ gap: 1 }}>
            <Text
              style={{ fontSize: 14, fontFamily: "inter", color: "#5D8082" }}
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
              Gazi Plot Hiwarkhed Road Akot
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
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>
          {upiCollapse && (
            <>
              <View
                style={{
                  gap: 4,
                }}
              >
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "inter-medium",
                      color: Colors.primary,
                      backgroundColor: "#e3eeec",
                      borderRadius: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 14,
                    }}
                  >
                    7249048715@ybl
                  </Text>
                  <FontAwesome6 name="copy" size={20} color="black" />
                </View>
              </View>
              <View style={{ gap: 4, marginTop: 10 }}>
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
                      uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
                    }}
                    style={{ width: 200, height: 200, objectFit: "contain" }}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <ImageView
          images={[
            {
              uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
            },
          ]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
    </View>
  );
}
