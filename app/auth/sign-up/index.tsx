import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";
import { DESIGNATION_TYPES } from "@/constants/constants";
import { Formik } from "formik";
import * as Yup from "yup";
import { createAccount } from "@/services/auth";
import { useToast } from "react-native-toast-notifications";

export default function Index() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number is not valid"),
    designation: Yup.string().required("Designation is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleCreateAccount = async (values) => {
    setLoading(true);
    try {
      const data = await createAccount(values);

      if (data.success) {
        toast.show("Account created successfully", {
          type: "normal",
        });
        router.push("/auth/sign-in");
      } else {
        toast.show(data.msg || "Failed to create account", {
          type: "danger",
        });
        console.log("Error:", data.msg); // Log the error message for debugging
      }
    } catch (error) {
      toast.show("An error occurred. Please try again later", {
        type: "danger",
      });
      console.log("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        designation: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleCreateAccount}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "#fff",
            height: "100%",
            padding: 25,
          }}
        >
          <View style={{ marginTop: 100 }}>
            <Text
              style={{
                fontSize: 26,
                fontFamily: "inter-bold",
                color: Colors.primary,
              }}
            >
              Create New Account
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={values.fullName}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 9083427234"
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Designation</Text>
            <SelectList
              setSelected={(val) => setFieldValue("designation", val)}
              data={DESIGNATION_TYPES}
              save="value"
              boxStyles={{
                borderColor: Colors.primary,
              }}
              inputStyles={{
                fontSize: 16,
                // color: Colors.primary,
              }}
            />
            {touched.designation && errors.designation && (
              <Text style={styles.errorText}>{errors.designation}</Text>
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
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.WHITE} />
            ) : (
              <>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: "inter-medium",
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  Create Account
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color={Colors.WHITE}
                />
              </>
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "inter",
                marginBottom: 10,
                textAlign: "center",
                marginTop: 40,
              }}
            >
              Do you have account?{" "}
              <Text
                onPress={() => router.push("/auth/sign-in")}
                style={{ fontFamily: "inter-bold", color: Colors.primary }}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
