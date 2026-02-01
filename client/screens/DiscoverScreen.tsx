import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { MediaCard } from "@/components/MediaCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { DiscoverStackParamList } from "@/navigation/DiscoverStackNavigator";

type MediaType = "all" | "film" | "series" | "music" | "anime" | "manga" | "book";

const CATEGORIES: { key: MediaType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "film", label: "Films" },
  { key: "series", label: "Series" },
  { key: "music", label: "Music" },
  { key: "anime", label: "Anime" },
  { key: "manga", label: "Manga" },
  { key: "book", label: "Books" },
];

const MOCK_TRENDING = [
  {
    id: "t1",
    title: "Hot New Releases",
    imageUrl: "https://picsum.photos/seed/hot1/400/400",
    type: "film" as const,
  },
  {
    id: "t2",
    title: "Popular This Week",
    imageUrl: "https://picsum.photos/seed/pop1/400/400",
    type: "music" as const,
  },
  {
    id: "t3",
    title: "Rising Stars",
    imageUrl: "https://picsum.photos/seed/rise1/400/400",
    type: "anime" as const,
  },
];

const MOCK_TOP_LISTS = [
  {
    id: "l1",
    title: "Top 250 Albums",
    imageUrl: "https://picsum.photos/seed/album1/400/400",
    type: "music" as const,
  },
  {
    id: "l2",
    title: "Top 250 Films",
    imageUrl: "https://picsum.photos/seed/film1/400/400",
    type: "film" as const,
  },
  {
    id: "l3",
    title: "Top 250 Anime",
    imageUrl: "https://picsum.photos/seed/anime1/400/400",
    type: "anime" as const,
  },
  {
    id: "l4",
    title: "Best Books 2024",
    imageUrl: "https://picsum.photos/seed/book1/400/400",
    type: "book" as const,
  },
];

const MOCK_FOR_YOU = [
  {
    id: "f1",
    title: "Yeezus",
    imageUrl: "https://picsum.photos/seed/yeezus/400/400",
    type: "music" as const,
    rating: 4.5,
  },
  {
    id: "f2",
    title: "Blonde",
    imageUrl: "https://picsum.photos/seed/blonde2/400/400",
    type: "music" as const,
    rating: 5,
  },
  {
    id: "f3",
    title: "IGOR",
    imageUrl: "https://picsum.photos/seed/igor/400/400",
    type: "music" as const,
    rating: 4,
  },
  {
    id: "f4",
    title: "Attack on Titan",
    imageUrl: "https://picsum.photos/seed/aot/400/400",
    type: "anime" as const,
    rating: 4.8,
  },
];

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<DiscoverStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<MediaType>("all");

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: tabBarHeight + Spacing.xl,
        },
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={handleSearch}
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
          },
        ]}
      >
        <Feather name="search" size={20} color={theme.textSecondary} />
        <ThemedText
          type="body"
          style={[styles.searchPlaceholder, { color: theme.textSecondary }]}
        >
          Search...
        </ThemedText>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.key}
            onPress={() => setSelectedCategory(cat.key)}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === cat.key
                    ? theme.accent
                    : theme.backgroundDefault,
                borderColor:
                  selectedCategory === cat.key ? theme.accent : theme.border,
              },
            ]}
          >
            <ThemedText
              type="small"
              style={{
                color:
                  selectedCategory === cat.key ? "#0D0D0D" : theme.textSecondary,
                fontWeight: selectedCategory === cat.key ? "600" : "400",
              }}
            >
              {cat.label}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="Trending" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {MOCK_TRENDING.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            type={item.type}
            variant="gradient"
          />
        ))}
      </ScrollView>

      <SectionHeader title="Top Lists" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {MOCK_TOP_LISTS.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            type={item.type}
            variant="gradient"
          />
        ))}
      </ScrollView>

      <SectionHeader title="For You" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {MOCK_FOR_YOU.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            type={item.type}
            rating={item.rating}
            variant="compact"
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  searchPlaceholder: {
    marginLeft: Spacing.md,
  },
  categories: {
    paddingBottom: Spacing["2xl"],
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  horizontalList: {
    paddingBottom: Spacing["2xl"],
  },
});
