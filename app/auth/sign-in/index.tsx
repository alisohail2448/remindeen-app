import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/services/auth";

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

  const postUserLogin = async (values, { setSubmitting }) => {
    try {
      const data = await loginUser(values);

      if (data.token) {
        await AsyncStorage.setItem("jwtToken", data.token);
        ToastAndroid.show("Login successfully", ToastAndroid.LONG);
        router.push("/home");
      } else {
        ToastAndroid.show(data.message || "Failed to login", ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(
        "An error occurred. Please try again later.",
        ToastAndroid.LONG
      );
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
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
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={Colors.WHITE} />
              ) : (
                <>
                  <Text style={styles.buttonText}>Sign In</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
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
    </View>
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
    fontFamily: "redhat-bold",
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 26,
    fontFamily: "redhat",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "redhat",
    marginBottom: 10,
  },
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
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "redhat-medium",
    textAlign: "center",
    fontSize: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "redhat",
    marginTop: 5,
  },
  registerText: {
    fontSize: 16,
    fontFamily: "redhat",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
  },
  registerLink: {
    fontFamily: "redhat-bold",
    color: Colors.primary,
  },
});
