import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/services/auth";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/context/auth";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  const { signIn } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const postUserLogin = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);

    try {
      const data = await loginUser(values);

      if (data.token) {
        await signIn(data.token);
        toast.show("User logged in successfully", {
          type: "normal",
        });
      } else {
        toast.show(data.msg || "Failed to login", {
          type: "danger",
        });
        console.log("Error:", data.msg);
      }
    } catch (error) {
      toast.show("An error occurred. Please try again later", {
        type: "danger",
      });
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  React.useEffect(() => {
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
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: 100 }}>
          <Text style={styles.title}>Lets Sign You In</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
          <Text style={styles.subtitle}>You've been missed!</Text>
        </View>

        <Formik
          initialValues={{ phone: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={postUserLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={{ marginTop: 40 }}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+91 9083427234"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: Colors.primary,
                  }}
                >
                  <TextInput
                    style={[styles.password, { flex: 1 }]}
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.WHITE} />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Sign In</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={18}
                      color={Colors.WHITE}
                    />
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View>
          <Text style={styles.registerText}>
            Don't have any account?{" "}
            <Text
              onPress={() => router.push("/auth/sign-up")}
              style={styles.registerLink}
            >
              Register
            </Text>
          </Text>
        </View>
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
    marginTop: 20,
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
