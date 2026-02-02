import React, { ReactNode } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Gradients, Shadows } from "@/constants/theme";

interface ButtonProps {
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<any>;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
  energyThreshold: 0.001,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  onPress,
  children,
  style,
  textStyle,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98, springConfig);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, springConfig);
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: theme.backgroundDefault,
          borderWidth: 1,
          borderColor: theme.border,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
        };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "secondary":
      case "ghost":
        return theme.text;
      default:
        return theme.buttonText;
    }
  };

  if (variant === "primary") {
    return (
      <AnimatedPressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.button,
          { opacity: disabled ? 0.5 : 1 },
          Shadows.small,
          style,
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={Gradients.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <ThemedText
            type="body"
            style={[styles.buttonText, { color: getTextColor() }, textStyle]}
          >
            {children}
          </ThemedText>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        getButtonStyle(),
        { opacity: disabled ? 0.5 : 1 },
        style,
        animatedStyle,
      ]}
    >
      <ThemedText
        type="body"
        style={[styles.buttonText, { color: getTextColor() }, textStyle]}
      >
        {children}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
});
