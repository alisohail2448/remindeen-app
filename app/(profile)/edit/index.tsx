import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  ActivityIndicator,
  Dimensions,
  Platform,
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
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/services/profile";
import { uploadImage } from "@/services/upload";
import { useAuth } from "@/app/context/auth";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  designation: Yup.string(),
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
  const user = useSelector((state) => state?.user);
  const { token, userId, getUserProfile } = useAuth();
  const toast = useToast();
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);
  const [QRImage, setQRImage] = useState(user?.upi?.qr);
  const [profileImage, setProfileImage] = useState(user?.profilePic);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    const updatedData = {
      name: values?.name,
      designation: values?.designation,
      phone: values?.phone,
      email: values?.email,
      mosqueName: values?.mosqueName,
      mosqueArea: values?.mosqueArea,
      upi: {
        id: values?.upiId,
        qr: QRImage,
      },
      profilePic: profileImage,
    };
    try {
      const data = await updateUser(token, userId, updatedData);
      if (data.user) {
        getUserProfile();
        toast.show("Profile updated successfully", {
          type: "normal",
        });
        navigation.goBack();
      } else {
        toast.show(data?.msg || "Failed to update profile", {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("An error occurred. Please try again later.", {
        type: "danger",
      });
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
      const { uri, type, fileName } = result.assets[0];

      setQRImage(uri);

      const formData = new FormData();
      formData.append("image", {
        uri,
        type: `${type}/${uri.split(".").pop()}`,
        name: fileName || `image.${uri.split(".").pop()}`,
      });

      uploadQR(formData);
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
      const { uri, type, fileName } = result.assets[0];

      setProfileImage(uri);

      const formData = new FormData();
      formData.append("image", {
        uri,
        type: `${type}/${uri.split(".").pop()}`,
        name: fileName || `image.${uri.split(".").pop()}`,
      });

      uploadProfilePic(formData);
    }
  };

  const uploadProfilePic = async (formData) => {
    setIsUploading(true);
    try {
      const response = await uploadImage(token, formData);
      if (response && response.url) {
        setProfileImage(response.url);
      } else {
        console.log("Upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadQR = async (formData) => {
    setIsUploading(true);
    try {
      const response = await uploadImage(token, formData);
      if (response && response.url) {
        setQRImage(response.url);
      } else {
        console.log("Upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
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
              name: user?.name,
              designation: user?.designation,
              phone: user?.phone,
              email: user?.email,
              mosqueName: user?.mosqueName,
              mosqueArea: user?.mosqueArea,
              upiId: user?.upi?.id,
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
                      position: "relative",
                    }}
                  >
                    <Image
                      style={styles.profileImage}
                      source={
                        profileImage
                          ? {
                              uri: profileImage,
                            }
                          : user?.role === "admin"
                          ? require("../../../assets/images/profile.jpg")
                          : user?.role === "subadmin"
                          ? require("../../../assets/images/subprofile.jpg")
                          : require("../../../assets/images/user.jpg")
                      }
                    />
                    {isUploading && (
                      <ActivityIndicator
                        style={{ position: "absolute", left: 35, top: "40%" }}
                        color={Colors.WHITE}
                      />
                    )}
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
                  <View style={[styles.inputGroup]}>
                    <Text style={styles.label}>Designation</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Designation"
                      value={values.designation}
                      onChangeText={handleChange("designation")}
                      onBlur={handleBlur("designation")}
                      editable={
                        user?.role === "admin" || user?.role === "subadmin"
                          ? false
                          : true
                      }
                    />
                    {touched.designation && errors.designation && (
                      <Text style={styles.error}>{errors.designation}</Text>
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
                      style={[styles.input, { textAlignVertical: "top" }]}
                      placeholder="Mosque Area"
                      value={values.mosqueArea}
                      multiline
                      numberOfLines={4}
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
      </View>
      <ProfilePicUpload
        modalVisible={openImageUploadDialog}
        setModalVisible={setOpenImageUploadDialog}
        handlePickImage={handlePickImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    padding: 16,
    // flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "#FBFBFB",
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
