import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePic}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={require("../../assets/images/profile.png")}
            />
            <View style={{ gap: 5 }}>
              <Text style={styles.textTitle}>Assalam Alaikum!</Text>
              <Text style={styles.welcome}>Welcome Back!</Text>
              <Text style={styles.userText}>John Doe</Text>
            </View>
          </View>
          <View>
            <Image
              style={{ width: 17.88, height: 19 }}
              source={require("../../assets/images/Vector.png")}
            />
          </View>
        </View>
        <View>
          <Text>Footer Section</Text>
        </View>
      </View>
      <View></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginTop: 26,
    padding: 30,
    backgroundColor: "#102A2B",
    height: "50%",
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:40
  },
  profilePic: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    width: 192,
    height: 50,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "redhat-medium",
    color: "#FFFFFF",
  },
  welcome: {
    fontSize: 14,
    fontFamily: "redhat",
    color: "#FFFFFF",
  },
  userText: {
    fontSize: 10,
    fontFamily: "redhat",
    color: "#FFFFFF",
  },
});
