import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { icons } from "@/assets/icons";
import { Colors } from "@/constants/Colors";

const TabBarButton = (props) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  return (
    <Pressable {...props} style={styles.container}>
      <View style={{  alignItems: 'center', gap: 2, paddingVertical: 0, paddingHorizontal: 16, borderRadius: 20 }}>
        <Animated.View >
          {icons[routeName]({
            color,
          })}
        </Animated.View>

          <Animated.Text
            style={[
              {
                color,
                fontSize: 12,
                fontFamily: "inter-medium",
                textTransform: 'capitalize'
              },
            ]}
          >
            {label}
          </Animated.Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export default TabBarButton;
