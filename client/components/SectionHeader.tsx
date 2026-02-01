import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  rightLabel?: string;
}

export function SectionHeader({
  title,
  onSeeAll,
  rightLabel = "See All",
}: SectionHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="h4" style={styles.title}>
        {title}
      </ThemedText>
      {onSeeAll ? (
        <Pressable
          onPress={onSeeAll}
          style={styles.seeAllButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ThemedText type="small" style={{ color: theme.accent }}>
            {rightLabel}
          </ThemedText>
          <Feather
            name="chevron-right"
            size={16}
            color={theme.accent}
            style={styles.icon}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  title: {
    flex: 1,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 2,
  },
});
