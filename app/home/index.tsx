import { View, Text, Image, TouchableOpacity, Button, ImageBackground, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            style={styles.profilePic}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={require("../../assets/images/profile.png")}
            />
            <View style={{ gap: 5 }}>
              <Text style={styles.textTitle}>Assalam Alaikum!</Text>
              <Text style={styles.welcome}>Welcome Back!</Text>
              <Text style={styles.userText}>John Doe</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Link href={"/notification"}>
              <Ionicons name="notifications" size={40} color="#EAAF67" />
            </Link>
          </View>
        </View>
        <ImageBackground
          source={require("../../assets/images/MaskGroup.png")}
          style={styles.tasbeehCounter}
          imageStyle={styles.imageStyle}
        >
          <View>
            <Text style={{ fontSize: 14, fontFamily: "poppins" }}>
              Remember Allah
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "poppins",
                fontWeight: "bold",
                width: 150,
              }}
            >
              Start Tasbih Counter
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.getStartedBtn}
              // onPress={onPressLearnMore}
            >
              <Text style={styles.buttonText}>Get Start Now</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

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
    height: "100%",
    backgroundColor: "#102A2B",
  },
  scrollView:{
    marginHorizontal: 20,
  },
  profileContainer: {
    marginTop: 26,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  profilePic: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: 192,
    height: 50,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "inter-medium",
    color: "#FFFFFF",
  },
  welcome: {
    fontSize: 14,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
  userText: {
    fontSize: 10,
    fontFamily: "inter",
    color: "#FFFFFF",
  },
  tasbeehCounter:{
    width: 'auto',
    height: 150,
    borderColor: 'black',
    margin: 10,
    backgroundColor: '#F6AF58',
    borderRadius: 13,
    marginTop: 50,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  imageStyle:{
    width: 150, 
    height: 150,
    resizeMode: 'cover',
    position:'absolute',
    left:278
  },
  getStartedBtn:{
    width:150,
    height:60,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#1C5153',
    borderRadius:10
  },
  buttonText:{
    fontSize:20,
    fontFamily:'poppins',
    color:'#FFFFFF'
  }
});
