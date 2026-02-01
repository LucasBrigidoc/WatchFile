import React from "react";
import { StyleSheet, View, Image } from "react-native";

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

const images: Record<EmptyStateType, any> = {
  timeline: require("../../assets/images/empty-timeline.png"),
  search: require("../../assets/images/empty-search.png"),
  posts: require("../../assets/images/empty-posts.png"),
  reviews: require("../../assets/images/empty-reviews.png"),
  lists: require("../../assets/images/empty-lists.png"),
  status: require("../../assets/images/empty-posts.png"),
};

export function EmptyState({ type, title, message }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image source={images[type]} style={styles.image} resizeMode="contain" />
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
  image: {
    width: 180,
    height: 180,
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
