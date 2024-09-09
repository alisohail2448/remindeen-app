import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { sendOtp } from "@/services/auth";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/context/auth";
import { useToast } from "react-native-toast-notifications";
import CustomPhoneInput from "@/components/CustomPhoneInput";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  const { signIn } = useAuth();
  const toast = useToast();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  

  const handlePhoneInputChange = (input) => {
    const sanitizedInput = input.replace(/[^0-9]/g, "");
    const limitedInput = sanitizedInput.slice(0, 10);
    setIsValidPhone(limitedInput.length === 10);
  };



  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      const response = await sendOtp({phone: phoneNumber});
      if (response.success === false) {
        toast.show("Failed to send OTP:", response.msg, {
          type: "danger",
        });
      } else {
        toast.show("OTP sent successfully:", {
          type: "success",
        });
        dispatch({
          type: "SET_SIGNIN_PHONE",
          payload: phoneNumber,
        });
        router.push("/auth/sign-in/confirm-otp");
      }
    } catch (error) {
      toast.show("An unexpected error occurred:", {
        type: "danger",
      });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: 140 }}>
          <Text style={styles.title}>Lets Sign You In</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
          <Text style={styles.subtitle}>You've been missed!</Text>
        </View>

        <CustomPhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onPhoneInputChange={handlePhoneInputChange}
        />

        <TouchableOpacity
          style={{}}
          onPress={handleSendOtp}
          disabled={!isValidPhone || isSending}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary]}
            style={{
              borderRadius: 10,
              paddingVertical: 14,
              opacity: isValidPhone ? 1 : 0.5,
            }}
          >
            {isSending ? (
              <ActivityIndicator size={22} color="white" />
            ) : (
              <Text
                style={{
                  fontFamily: "inter-medium",
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontFamily: "inter-bold",
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 26,
    fontFamily: "inter",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "inter-medium",
    marginBottom: 10,
    color: Colors.primary,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    fontFamily: "inter-medium",
    fontSize: 16,
    color: Colors.primary,
  },
  password: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: "inter-medium",
    fontSize: 16,
    color: Colors.primary,
  },
  button: {
    padding: 15,
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 40,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "inter-medium",
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "inter",
    marginTop: 5,
  },
  registerText: {
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
  },
  registerLink: {
    fontFamily: "inter-bold",
    color: Colors.primary,
  },
});
