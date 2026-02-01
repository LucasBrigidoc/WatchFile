import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Spacing, Gradients } from "@/constants/theme";

export type MediaType = "film" | "series" | "music" | "anime" | "manga" | "book";

interface MediaTypeBadgeProps {
  type: MediaType;
  size?: "small" | "medium";
}

const typeLabels: Record<MediaType, string> = {
  film: "Film",
  series: "Series",
  music: "Music",
  anime: "Anime",
  manga: "Manga",
  book: "Book",
};

export function MediaTypeBadge({ type, size = "small" }: MediaTypeBadgeProps) {
  return (
    <LinearGradient
      colors={Gradients.primary as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.badge, size === "medium" && styles.badgeMedium]}
    >
      <ThemedText
        style={[styles.text, size === "medium" && styles.textMedium]}
      >
        {typeLabels[type]}
      </ThemedText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.full,
  },
  badgeMedium: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  text: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  textMedium: {
    fontSize: 12,
  },
});
