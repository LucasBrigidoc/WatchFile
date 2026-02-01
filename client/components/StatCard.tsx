import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Shadows } from "@/constants/theme";

interface StatCardProps {
  value: number | string;
  label: string;
  onPress?: () => void;
}

export function StatCard({ value, label, onPress }: StatCardProps) {
  const { theme } = useTheme();

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
        },
      ]}
    >
      <ThemedText type="h3" style={[styles.value, { color: theme.accent }]}>
        {value}
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.label, { color: theme.textSecondary }]}
      >
        {label}
      </ThemedText>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minWidth: 80,
  },
  value: {
    fontWeight: "700",
  },
  label: {
    marginTop: Spacing.xs,
  },
});
