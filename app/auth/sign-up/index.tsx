import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";
import { DESIGNATION_TYPES, POST_CREATE_ACCOUNT } from "@/constants/constants";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number is not valid"),
    designation: Yup.string().required("Designation is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleCreateAccount = async (values) => {
    try {
      const response = await axios.post(POST_CREATE_ACCOUNT, values);

      const data = response.data;

      if (data.success) {
        ToastAndroid.show("Account created successfully", ToastAndroid.LONG);
        router.push("/home");
      } else {
        ToastAndroid.show(
          data.msg || "Failed to create account",
          ToastAndroid.LONG
        );
        console.log("dataaa", data);
      }
    } catch (error) {
      ToastAndroid.show(
        "An error occurred. Please try again later.",
        ToastAndroid.LONG
      );
      console.log("error", error);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
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
        <View
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
                fontFamily: "redhat-bold",
                color: Colors.primary,
              }}
            >
              Create New Account
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
              Full Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
              Phone
            </Text>
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
            <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
              Designation
            </Text>
            <SelectList
              setSelected={(val) => setFieldValue("designation", val)}
              data={DESIGNATION_TYPES}
              save="value"
              boxStyles={{
                borderColor: "#000",
              }}
              inputStyles={{
                paddingVertical: 6,
              }}
            />
            {touched.designation && errors.designation && (
              <Text style={styles.errorText}>{errors.designation}</Text>
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
              Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: "redhat-medium",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Create Account
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={Colors.WHITE}
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "redhat",
                marginBottom: 10,
                textAlign: "center",
                marginTop: 40,
              }}
            >
              Do you have account?{" "}
              <Text
                onPress={() => router.push("/auth/sign-in")}
                style={{ fontFamily: "redhat-bold", color: Colors.primary }}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#000",
    fontFamily: "redhat",
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
