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
import { useToast } from "react-native-toast-notifications";
import { updateUser } from "@/services/profile";
import { useAuth } from "@/app/context/auth";

export default function Index() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { token, userId } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().required("Email is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const handleCreateAccount = async (values) => {
    setLoading(true);
    try {
      const data = await updateUser(token, userId, values);

      if (data.success) {
        toast.show("User created successfully", {
          type: "normal",
        });
        router.push("/(tabs)/");
      } else {
        toast.show(data.msg || "Failed to create user", {
          type: "danger",
        });
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
        designation: "",
        email: "",
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
              Make yourself Onboard
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
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
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="user@gmail.com"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.email}</Text>
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
                  Continue
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color={Colors.WHITE}
                />
              </>
            )}
          </TouchableOpacity>
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
    paddingVertical: 12,
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 80,
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
