// CustomPhoneInput.js
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import * as yup from "yup";

const CustomPhoneInput = ({ onPhoneInputChange, phoneNumber,setPhoneNumber  }) => {
  const [country, setCountry] = useState({ cca2: "IN", callingCode: "91" });
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const pickerRef = useRef(null);

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setPhoneNumber("");
    setError("");
  };

  const handlePhoneNumberChange = (text) => {
    const sanitizedInput = text.replace(/[^0-9]/g, "");

    const limitedInput = sanitizedInput.slice(0, 10);

    setPhoneNumber(limitedInput);

    if (onPhoneInputChange) {
      onPhoneInputChange(limitedInput);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ gap: 14 }}>
        <TouchableOpacity
          style={styles.countryPicker}
          onPress={() => setShowPicker(true)}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "inter-medium",
                color: "#808080",
              }}
            >
              County / Region
            </Text>

            <View style={{ flexDirection: "row", gap: 6 }}>
              <CountryPicker
                ref={pickerRef}
                visible={showPicker}
                onSelect={handleCountrySelect}
                withCallingCode
                countryCode={"IN"}
                withFilter
                onClose={() => setShowPicker(false)}
              />
              <Text
                style={styles.countryCode}
              >{`( +${country.callingCode} )`}</Text>
            </View>
          </View>
          <Entypo name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: Colors.primary,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "inter-medium",
              color: "#808080",
            }}
          >
            Phone number
          </Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="88888 88888"
            keyboardType="phone-pad"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={10}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  countryPicker: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryCode: {
    fontSize: 18,
    marginRight: 5,
    fontFamily: "inter-medium",
  },
  input: {
    // flex: 1,
    fontSize: 18,
    fontFamily: "inter-medium",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
    fontFamily: "inter-medium",
  },
});

export default CustomPhoneInput;
