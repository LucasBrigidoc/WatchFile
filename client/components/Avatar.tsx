import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { BorderRadius } from "@/constants/theme";

interface AvatarProps {
  uri?: string | null;
  size?: number;
}

export function Avatar({ uri, size = 48 }: AvatarProps) {
  const { theme } = useTheme();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.backgroundSecondary,
          borderColor: theme.border,
        },
      ]}
    >
      <Feather name="user" size={size * 0.5} color={theme.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
