import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Button,
} from "react-native";
import { useNavigation } from "expo-router";
import {
  Entypo,
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import ImageView from "react-native-image-viewing";
import * as ImagePicker from "expo-image-picker";
import ProfilePicUpload from "@/components/ProfilePicUpload";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits"),
  email: Yup.string().email("Invalid email"),
  mosqueName: Yup.string(),
  mosqueArea: Yup.string(),
  upiId: Yup.string(),
});

export default function EditProfile() {
  const navigation = useNavigation();
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);
  const [QRImage, setQRImage] = useState(
    "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq"
  );
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    console.log("valuees", values);
    try {
      // Perform the update operation here, e.g., an API call
      // await updateProfile(values);

      ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
      navigation.goBack(); // Go back to the profile screen after update
    } catch (error) {
      ToastAndroid.show(
        "An error occurred. Please try again later.",
        ToastAndroid.LONG
      );
    } finally {
      setSubmitting(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setQRImage(result.assets[0].uri);
    }
  };

  const handlePickImage = async (pickerType) => {
    setOpenImageUploadDialog(false);
    let result;
    if (pickerType === "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    }
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            name: "Sohail Akhtar Ali",
            phone: "+91 7249047105",
            email: "maulana@gmail.com",
            mosqueName: "Minara Masjid",
            mosqueArea: "Gazi Plot Hiwarkhed Road Akot",
            upiId: "7249047105@ybl",
          }}
          validationSchema={validationSchema}
          onSubmit={handleProfileUpdate}
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
              <View style={styles.profileContainer}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: Colors.primary,
                    borderStyle: "dashed",
                    alignSelf: "center",
                    borderRadius: 100,
                    padding: 5,
                  }}
                >
                  <Image
                    style={styles.profileImage}
                    source={
                      profileImage
                        ? {
                            uri: profileImage,
                          }
                        : require("../../../assets/images/profile.png")
                    }
                  />
                  <Pressable
                    onPress={() => setOpenImageUploadDialog(true)}
                    style={{
                      backgroundColor: "#e3eeec",
                      borderRadius: 100,
                      padding: 5,
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="image-edit"
                      size={24}
                      color={Colors.primary}
                    />
                  </Pressable>
                </View>
                <View style={[styles.inputGroup, { marginTop: 20 }]}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mosque Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mosque Name"
                    value={values.mosqueName}
                    onChangeText={handleChange("mosqueName")}
                    onBlur={handleBlur("mosqueName")}
                  />
                  {touched.mosqueName && errors.mosqueName && (
                    <Text style={styles.error}>{errors.mosqueName}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mosque Area</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mosque Area"
                    value={values.mosqueArea}
                    onChangeText={handleChange("mosqueArea")}
                    onBlur={handleBlur("mosqueArea")}
                  />
                  {touched.mosqueArea && errors.mosqueArea && (
                    <Text style={styles.error}>{errors.mosqueArea}</Text>
                  )}
                </View>
              </View>

              <View style={styles.upiContainer}>
                <Pressable
                  onPress={() => setUpiCollapse(!upiCollapse)}
                  style={styles.upiHeader}
                >
                  <Text style={styles.upiTitle}>UPI Details</Text>
                  {upiCollapse ? (
                    <Feather
                      name="chevron-up"
                      size={24}
                      color={Colors.primary}
                    />
                  ) : (
                    <Feather
                      name="chevron-down"
                      size={24}
                      color={Colors.primary}
                    />
                  )}
                </Pressable>
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>UPI Id</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="UPI"
                      value={values.upiId}
                      onChangeText={handleChange("upiId")}
                      onBlur={handleBlur("upiId")}
                    />
                    {touched.upiId && errors.upiId && (
                      <Text style={styles.error}>{errors.upiId}</Text>
                    )}
                  </View>
                  <View style={styles.upiQrContainer}>
                    <Text style={styles.upiLabel}>UPI QR</Text>
                    {/* <Button
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                      /> */}
                    <View
                      style={{
                        backgroundColor: "#e3eeec",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0,
                        padding: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        borderStyle: "dashed",
                      }}
                    >
                      {QRImage ? (
                        <TouchableOpacity
                          style={styles.qrImageContainer}
                          onPress={() => setIsVisible(true)}
                        >
                          <Image
                            source={{
                              uri: QRImage,
                            }}
                            style={styles.qrImage}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Entypo
                          name="upload"
                          size={24}
                          color={Colors.primary}
                        />
                      )}

                      <Pressable
                        onPress={pickImage}
                        style={{
                          // backgroundColor: Colors.primary,
                          borderRadius: 6,
                          padding: 8,
                          paddingHorizontal: 16,
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.primary,
                            fontSize: 14,
                            fontFamily: "inter-bold",
                          }}
                        >
                          {QRImage ? "Change QR" : "Upload QR"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              </View>

              <Pressable
                style={styles.saveButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.saveButtonText}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Text>
              </Pressable>

              <ImageView
                images={[
                  {
                    uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
                  },
                ]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <ProfilePicUpload
        modalVisible={openImageUploadDialog}
        setModalVisible={setOpenImageUploadDialog}
        handlePickImage={handlePickImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#FBFBFB",
    height: "100%",
    marginBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    backgroundColor: "#e3eeec",
    borderRadius: 100,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "inter-bold",
    color: Colors.primary,
  },
  profileContainer: {
    gap: 0,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  inputGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "inter-medium",
    color: Colors.primary,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: "inter-medium",
    borderWidth: 1,
    borderColor: "#ccc",
    color: Colors.BLACK,
  },
  error: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  upiContainer: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  upiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upiTitle: {
    fontSize: 16,
    fontFamily: "inter-bold",
    color: Colors.primary,
  },
  upiDetails: {
    marginTop: 10,
  },
  upiLabel: {
    fontSize: 16,
    fontFamily: "inter-bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  upiIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  upiId: {
    fontSize: 16,
    fontFamily: "inter",
  },
  upiQrContainer: {
    marginTop: 10,
  },
  qrImageContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 100,
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "inter-bold",
  },
});
