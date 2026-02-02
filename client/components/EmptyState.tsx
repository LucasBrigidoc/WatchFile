import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

type EmptyStateType =
  | "timeline"
  | "search"
  | "posts"
  | "reviews"
  | "lists"
  | "status";

interface EmptyStateProps {
  type: EmptyStateType;
  title: string;
  message: string;
}

const icons: Record<EmptyStateType, keyof typeof Feather.glyphMap> = {
  timeline: "layers",
  search: "search",
  posts: "edit-3",
  reviews: "star",
  lists: "list",
  status: "info",
};

export function EmptyState({ type, title, message }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: theme.backgroundDefault }]}>
        <Feather name={icons[type]} size={48} color={theme.accent} />
      </View>
      <ThemedText type="h4" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.message, { color: theme.textSecondary }]}
      >
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["3xl"],
    paddingVertical: Spacing["4xl"],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
  },
});
