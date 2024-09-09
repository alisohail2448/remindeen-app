import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { signInApi } from "@/services/auth";
import { useAuth } from "@/app/context/auth";

export default function index() {
  const signIn = useSelector((state) => state?.signIn);
  const navigation = useNavigation();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const { signIn: signInToken } = useAuth();

  const handleSendOtp = async () => {
    //   try {
    //     const response = await sendOtpApi(signIn?.phone);
    //     if (response.success === false) {
    //       toast.show("Failed to send OTP:", response.message, {
    //         type: "danger",
    //       });
    //     } else {
    //       toast.show("OTP sent successfully:", response, {
    //         type: "success",
    //       });
    //       router.push("/(auth)/sign-in/confirm-otp");
    //     }
    //   } catch (error) {
    //     toast.show("An unexpected error occurred:", {
    //       type: "danger",
    //     });
    //   }
  };

  const handleSignIn = async () => {
    if (otp.length !== 6) {
      toast.show("Please enter a valid 6-digit OTP.", {
        type: "danger",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await signInApi({ phone: signIn?.phone, otp: otp });
      if (response.success) {
        if (response?.user?.isOnboarded) {
          toast.show("User logged in successfully!", {
            type: "success",
          });

          if (response?.token) {
            await signInToken(response.token);
            router.push("/(tabs)/");
          }
        } else {
          if (response?.token) {
            await signInToken(response?.token);
            router.push("/auth/(onboarding)/");
          }
        }
      }

      if (response?.success === false) {
        toast.show(response.msg || "Failed to login user", {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("An error occurred. Please try again later", {
        type: "danger",
      });
      console.log("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={{ paddingTop: 40, flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20, gap: 30, marginTop: 100 }}>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              color: Colors.primary,
              fontFamily: "inter-bold",
            }}
          >
            Confirm your number
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "inter-bold",
              color: "#808080",
              lineHeight: 24,
            }}
          >
            Enter the code we send to +{signIn.phone}
          </Text>
        </View>
        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => setOtp(text)}
          theme={{
            pinCodeContainerStyle: {
              borderRadius: 5,
              borderColor: "#C4C4C4",
            },
            pinCodeTextStyle: {
              fontFamily: "inter-medium",
            },
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "inter-bold",
              color: "#808080",
              lineHeight: 24,
            }}
          >
            Did&apos;t get the code ?
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "inter-medium",
              color: "#808080",
              lineHeight: 24,
            }}
          >
            30s before you can{" "}
            <Text
              onPress={handleSendOtp}
              style={{ color: Colors.primary, fontFamily: "inter-bold" }}
            >
              resend
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={handleSignIn} disabled={isLoading}>
          <LinearGradient
            colors={[Colors.primary, Colors.primary]}
            style={{ borderRadius: 10, paddingVertical: 14 }}
          >
            {isLoading ? (
              <ActivityIndicator size={22} color="white" />
            ) : (
              <Text
                style={{
                  fontFamily: "inter-bold",
                  fontSize: 18,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
