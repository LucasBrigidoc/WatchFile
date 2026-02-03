import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";

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

  const handlePress = (event: any, index: number) => {
    if (editable && onRatingChange) {
      const { locationX } = event.nativeEvent;
      const isHalf = showHalf && locationX < size / 2;
      const newRating = index + (isHalf ? 0.5 : 1);
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onRatingChange(newRating);
    }
  };

  const renderStar = (index: number) => {
    const filled = index + 1 <= Math.floor(rating);
    const halfFilled = showHalf && !filled && index < rating;

    let iconName: "star" | "star-half-full" | "star-o" = "star-o";
    if (filled) {
      iconName = "star";
    } else if (halfFilled) {
      iconName = "star-half-full";
    }

    return (
      <Pressable
        key={index}
        onPress={(e) => handlePress(e, index)}
        disabled={!editable}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      >
        <FontAwesome
          name={iconName}
          size={size}
          color={filled || halfFilled ? theme.star : theme.textSecondary}
          style={[
            styles.star,
            { opacity: filled || halfFilled ? 1 : 0.3 },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.labelContainer}>
        <FontAwesome name="star" size={12} color={theme.star} />
        <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
          {rating}/{maxRating}
        </Text>
      </View>
      <View style={styles.container}>
        {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "flex-start",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  ratingText: {
    ...Typography.caption,
    marginLeft: 4,
    fontWeight: "600",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: Spacing.xs,
  },
});
