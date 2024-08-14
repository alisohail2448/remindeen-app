import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";
import {
  DESIGNATION_TYPES,
  POST_CREATE_ACCOUNT,
  SERVER_URL,
} from "@/constants/constants";
import axios from "axios";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    if (!fullName || !phone || !designation || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.LONG);
      return;
    }

    try {
      const response = await axios.post(POST_CREATE_ACCOUNT, {
        name: fullName,
        phone,
        designation,
        password,
      });

      const data = response.data;

      if (data.success) {
        ToastAndroid.show("Account created successfully", ToastAndroid.LONG);
        router.push("/auth/sign-in");
      } else {
        ToastAndroid.show(
          data.message || "Failed to create account",
          ToastAndroid.LONG
        );
        console.log("dataa", data)
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
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
          Phone
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+91 9083427234"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
          Designation
        </Text>
        <SelectList
          setSelected={(val) => setDesignation(val)}
          data={DESIGNATION_TYPES}
          save="value"
          boxStyles={{
            borderColor: "#000",
          }}
          inputStyles={{
            paddingVertical: 6,
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
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
});
