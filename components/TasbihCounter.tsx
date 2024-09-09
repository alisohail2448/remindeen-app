import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TASBIH_DATA } from "@/constants/constants";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TasbihCounter() {
  const dispatch = useDispatch();
  const { count, tasbih, history } = useSelector((state) => state?.counter);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "SELECT_TASBIH", payload: TASBIH_DATA?.[0]?.key });
  }, []);

  const tasbihSelect = (value) => {
    dispatch({ type: "SELECT_TASBIH", payload: value });
  };

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [count]);

  useEffect(() => {
    if (isRunning) {
      timerAnim.setValue(0);
      Animated.timing(timerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleCount = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
    dispatch({ type: "INCREMENT_COUNT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_COUNT" });
    setTimer(0);
    saveHistory(count);
    setIsRunning(false);
  };

  const saveHistory = (countValue) => {
    const time = formatTime(timer);
    dispatch({ type: "HISTORY", payload: { countValue, tasbih, time } });
  };

  const handleHistoryPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs < 10 ? `0${hrs}` : hrs}:${mins < 10 ? `0${mins}` : mins}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectListContainer}>
        <SelectList
          setSelected={tasbihSelect}
          data={TASBIH_DATA}
          save="key"
          boxStyles={styles.box}
          inputStyles={styles.input}
          dropdownStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdownText}
          placeholder="Select tasbih"
        />
        <View style={{ marginTop: 80 }} >
          <Text style={styles.tasbihText}>{tasbih}</Text>
        </View>
      </View>

      <Animated.View>
        <Text style={styles.counter}>{count}</Text>
      </Animated.View>

      <Animated.View style={{ opacity: timerAnim }}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </Animated.View>

      <View style={styles.subContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleHistoryPress}>
            <MaterialIcons name="work-history" size={40} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
            <MaterialCommunityIcons
              name="refresh-circle"
              size={45}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.centerAlign}>
      <TouchableOpacity onPress={handleCount} style={styles.countButton}>
        <MaterialCommunityIcons
          name="counter"
          size={24}
          color={Colors.primary}
        />
        <Text style={styles.buttonText}>
          Counter
        </Text>
      </TouchableOpacity>
    </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>History</Text>
                  <Pressable onPress={handleModalClose}>
                    <MaterialIcons name="close" color="#000" size={24} />
                  </Pressable>
                </View>
                <ScrollView style={styles.historyContainer}>
                  {history?.length !== 0 ? (
                    history?.map((item, index) => (
                      <Text key={index} style={styles.historyItem}>
                        {item}
                      </Text>
                    ))
                  ) : (
                    <Text style={{ textAlign: "center", fontSize: 24 }}>
                      No History Available
                    </Text>
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 20,
  },
  selectListContainer: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  tasbihText: {
    fontFamily: "arabic",
    fontSize: 50,
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    top: -30,
  },
  counter: {
    fontSize: 90,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  timer: {
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 10,
  },
  subContainer: {
    height: "23%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    height: "30%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    overflow: "scroll",
    paddingBottom: 20,
  },
  titleContainer: {
    paddingVertical: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontFamily: "inter-bold",
  },
  historyContainer: {
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 18,
    marginTop: 5,
    color: "#000",
    paddingHorizontal: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
  },
  box: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  input: {
    color: "#000",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#fff",
  },
  dropdownText: {
    color: "#000",
    fontSize: 16,
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1C5153',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'inter-bold',
    fontSize: 16,
    color: Colors.primary,
    marginTop: 4,
  },
});
