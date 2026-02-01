import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  showHalf?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  editable = false,
  onRatingChange,
  showHalf = true,
}: StarRatingProps) {
  const { theme } = useTheme();

  const handlePress = (index: number) => {
    if (editable && onRatingChange) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onRatingChange(index + 1);
    }
  };

  const renderStar = (index: number) => {
    const filled = index < Math.floor(rating);
    const halfFilled = showHalf && !filled && index < rating && index >= Math.floor(rating);

    return (
      <Pressable
        key={index}
        onPress={() => handlePress(index)}
        disabled={!editable}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      >
        <Feather
          name={filled ? "star" : "star"}
          size={size}
          color={filled || halfFilled ? theme.star : theme.textSecondary}
          style={[
            styles.star,
            { opacity: filled ? 1 : halfFilled ? 0.5 : 0.3 },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: Spacing.xs,
  },
});
