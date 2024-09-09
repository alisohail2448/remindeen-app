import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const RemoveUserDialog = ({
  modalVisible,
  setModalVisible,
  handleRemoveAccount,
}) => {
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
            <View style={{ marginTop: -20, gap: 5 }}>
              <Text style={styles.modalText}>Remove account</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "inter",
                  color: Colors.BLACK,
                }}
              >
                The account and associated all the stuffs will be permanently
                removed.
              </Text>

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
                  onPress={handleRemoveAccount}
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
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "inter-medium",
                      color: Colors.WHITE,
                    }}
                  >
                    Remove
                  </Text>
                </Pressable>
              </View>
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
    marginTop: 22,
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

export default RemoveUserDialog;
