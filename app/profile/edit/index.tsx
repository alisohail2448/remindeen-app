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
} from "react-native";
import { useNavigation } from "expo-router";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import ImageView from "react-native-image-viewing";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mosqueName: Yup.string().required("Mosque name is required"),
  mosqueArea: Yup.string().required("Mosque area is required"),
});

export default function EditProfile() {
  const navigation = useNavigation();
  const [upiCollapse, setUpiCollapse] = useState(false);
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
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

      <ScrollView>
        <Formik
          initialValues={{
            name: "Sohail Akhtar Ali",
            phone: "+91 7249047105",
            email: "maulana@gmail.com",
            mosqueName: "Minara Masjid",
            mosqueArea: "Gazi Plot Hiwarkhed Road Akot",
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
                <Image
                  style={styles.profileImage}
                  source={require("../../../assets/images/profile.png")}
                />
                <View style={styles.inputGroup}>
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
                <TouchableOpacity
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
                </TouchableOpacity>
                {upiCollapse && (
                  <>
                    <View style={styles.upiDetails}>
                      <Text style={styles.upiLabel}>UPI Id</Text>
                      <View style={styles.upiIdContainer}>
                        <Text style={styles.upiId}>7249048715@ybl</Text>
                        <FontAwesome6 name="copy" size={20} color="black" />
                      </View>
                    </View>
                    <View style={styles.upiQrContainer}>
                      <Text style={styles.upiLabel}>UPI QR</Text>
                      <TouchableOpacity
                        style={styles.qrImageContainer}
                        onPress={() => setIsVisible(true)}
                      >
                        <Image
                          source={{
                            uri: "https://qph.cf2.quoracdn.net/main-qimg-6f10dcab91fe9a768c8757381a98e9ae-pjlq",
                          }}
                          style={styles.qrImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.saveButtonText}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>

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
    gap: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignSelf: "center",
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "inter-bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "inter",
    borderWidth: 1,
    borderColor: Colors.primary
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
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 100
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "inter-bold",
  },
});
