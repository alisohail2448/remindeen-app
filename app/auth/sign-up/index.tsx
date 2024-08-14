import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
          Phone
        </Text>
        <TextInput style={styles.input} placeholder="+91 9083427234" />
      </View>
      

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: "redhat", marginBottom: 10 }}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "redhat-medium",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Sign In
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
          Don't have any account?{" "}
          <Text style={{ fontFamily: "redhat-bold", color: Colors.primary }}>
            Register
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
