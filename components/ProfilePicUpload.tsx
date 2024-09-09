import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

const ProfilePicUpload = ({ modalVisible, setModalVisible, handlePickImage }) => {
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
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
            <View
              style={{
                backgroundColor: Colors.WHITE,
                width: "100%",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => handlePickImage('camera')}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.primary,
                      fontFamily: "inter-bold",
                    }}
                  >
                    Take a photo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePickImage('library')} style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.primary,
                      fontFamily: "inter-bold",
                    }}
                  >
                    Choose from library
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: Colors.WHITE,
                width: "100%",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.primary,
                    fontFamily: "inter-bold",
                  }}
                >
                  Cancel
                </Text>
                <Ionicons name="close" size={22} color={Colors.primary} />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // marginTop: 22,
    zIndex: 1,
  },
  modalView: {
    margin: 20,
    marginVertical: 10,
    // backgroundColor: "white",
    alignItems: "center",
    zIndex: 10,
    gap: 8,
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
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProfilePicUpload;
