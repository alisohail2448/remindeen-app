import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SelectList } from "react-native-dropdown-select-list";
import { ROLETYPES } from "@/constants/constants";
import { useAuth } from "@/app/context/auth";
import { useSelector } from "react-redux";
import { addUser } from "@/services/profile";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  role: Yup.string(),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits"),
});

const AddMemberDialog = ({ modalVisible, setModalVisible, fetchUsers }) => {
  const user = useSelector((state) => state?.user);
  const { token } = useAuth();
  const toast = useToast();

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    const addUserData = {
      name: values.name,
      role: values.role === "Sub Admin" ? "subadmin" : "user",
      phone: values.phone,
      adminId: user?._id,
    };

    try {
      const data = await addUser(token, addUserData);
      if (data.data) {
        toast.show("User added successfully", {
          type: "normal",
        });
        await fetchUsers();
        setModalVisible(false);
      } else {
        toast.show(data?.msg || "Failed to add user", {
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

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={[
            styles.centeredView,
            {
              backgroundColor: modalVisible
                ? "rgba(0, 0, 0, 0.3)"
                : "transparent",
            },
          ]}
        >
          <View style={styles.modalView}>
            <View style={{ alignItems: "flex-end", zIndex: 100 }}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#B5B5B5" />
              </Pressable>
            </View>
            <View style={{ marginTop: -20 }}>
              <Text style={styles.modalText}>Invite Member</Text>
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  role: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleProfileUpdate}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <>
                    <View style={styles.profileContainer}>
                      <View style={[styles.inputGroup, { marginTop: 15 }]}>
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
                      <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>Role</Text>
                        <SelectList
                          setSelected={(val) => setFieldValue("role", val)}
                          data={ROLETYPES}
                          save="value"
                          boxStyles={{
                            borderColor: "#ccc",
                          }}
                          inputStyles={{
                            fontSize: 16,
                            // color: Colors.primary,
                          }}
                        />
                        {touched.role && errors.role && (
                          <Text style={styles.error}>{errors.role}</Text>
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

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignSelf: "flex-end",
                        }}
                      >
                        <Pressable
                          onPress={() => setModalVisible(false)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            backgroundColor: "#e3eeec",
                            padding: 8,
                            paddingHorizontal: 16,
                            borderRadius: 6,
                            gap: 6,
                            marginTop: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: "inter-medium",
                              color: Colors.primary,
                            }}
                          >
                            Cancel
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={handleSubmit}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            backgroundColor: Colors.primary,
                            padding: 8,
                            paddingHorizontal: 16,
                            borderRadius: 6,
                            gap: 6,
                            marginTop: 20,
                          }}
                          disabled={isSubmitting}
                        >
                          <FontAwesome6
                            name="add"
                            size={18}
                            color={Colors.WHITE}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: "inter-medium",
                              color: Colors.WHITE,
                            }}
                          >
                            {isSubmitting ? "Adding..." : "Add"}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: 15,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "inter-bold",
    color: Colors.primary,
    fontSize: 18,
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
  profileContainer: {
    gap: 0,
  },
});

export default AddMemberDialog;
