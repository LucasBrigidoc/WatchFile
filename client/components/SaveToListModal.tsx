import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { GlassCard } from "@/components/GlassCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { authFetch } from "@/lib/api";

interface SaveToListModalProps {
  visible: boolean;
  onClose: () => void;
  media: {
    id: string;
    title: string;
    type: string;
    imageUrl?: string;
  };
  onCreateList: () => void;
}

interface UserList {
  id: string;
  name: string;
  coverImage: string | null;
  itemCount: number;
}

export function SaveToListModal({ visible, onClose, media, onCreateList }: SaveToListModalProps) {
  const { theme } = useTheme();
  const [lists, setLists] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetchLists();
    }
  }, [visible]);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/profile/lists");
      if (res.ok) {
        const data = await res.json();
        setLists(data.lists || []);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToList = async (listId: string) => {
    setSaving(listId);
    try {
      const res = await authFetch(`/api/profile/lists/${listId}/items`, {
        method: "POST",
        body: JSON.stringify({
          mediaId: media.id,
          mediaType: media.type,
          mediaTitle: media.title,
          mediaImage: media.imageUrl,
        }),
      });
      if (res.ok) {
        Alert.alert("Salvo!", `"${media.title}" foi adicionado à lista.`);
        onClose();
      } else {
        const data = await res.json();
        Alert.alert("Erro", data.message || "Não foi possível salvar.");
      }
    } catch (error) {
      console.error("Error saving to list:", error);
      Alert.alert("Erro", "Falha ao salvar na lista.");
    } finally {
      setSaving(null);
    }
  };

  const handleCreateNew = () => {
    onClose();
    setTimeout(() => onCreateList(), 300);
  };

  const renderListItem = ({ item }: { item: UserList }) => (
    <Pressable
      onPress={() => handleSaveToList(item.id)}
      disabled={saving !== null}
      style={({ pressed }) => [
        styles.listItem,
        { backgroundColor: pressed ? theme.backgroundSecondary : theme.backgroundDefault, borderColor: theme.border },
        saving === item.id && { opacity: 0.6 },
      ]}
    >
      {item.coverImage ? (
        <Image source={{ uri: item.coverImage }} style={styles.listCover} contentFit="cover" />
      ) : (
        <View style={[styles.listCoverPlaceholder, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="list" size={20} color={theme.accent} />
        </View>
      )}
      <View style={styles.listInfo}>
        <ThemedText type="body" style={{ fontWeight: "600" }} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {item.itemCount} {item.itemCount === 1 ? "item" : "itens"}
        </ThemedText>
      </View>
      {saving === item.id ? (
        <ActivityIndicator color={theme.accent} size="small" />
      ) : (
        <Feather name="plus-circle" size={22} color={theme.accent} />
      )}
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.handle}>
            <View style={[styles.handleBar, { backgroundColor: theme.textSecondary }]} />
          </View>

          <View style={styles.header}>
            <ThemedText type="h4" style={{ fontWeight: "700" }}>Salvar na Lista</ThemedText>
            <Pressable onPress={onClose} hitSlop={10}>
              <Feather name="x" size={24} color={theme.textSecondary} />
            </Pressable>
          </View>

          <View style={[styles.mediaPreview, { borderColor: theme.border }]}>
            {media.imageUrl ? (
              <Image source={{ uri: media.imageUrl }} style={styles.mediaThumb} contentFit="cover" />
            ) : null}
            <ThemedText type="body" numberOfLines={2} style={{ flex: 1, fontWeight: "500" }}>
              {media.title}
            </ThemedText>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={theme.accent} />
            </View>
          ) : (
            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Feather name="inbox" size={40} color={theme.textSecondary} />
                  <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md, textAlign: "center" }}>
                    Nenhuma lista ainda.{"\n"}Crie uma para começar!
                  </ThemedText>
                </View>
              }
              style={{ maxHeight: 300 }}
            />
          )}

          <Pressable
            onPress={handleCreateNew}
            style={[styles.createButton, { borderColor: theme.accent }]}
          >
            <Feather name="plus" size={18} color={theme.accent} />
            <ThemedText type="body" style={{ color: theme.accent, fontWeight: "600", marginLeft: Spacing.sm }}>
              Criar Nova Lista
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing["3xl"],
    maxHeight: "80%",
  },
  handle: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  mediaPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  mediaThumb: {
    width: 44,
    height: 64,
    borderRadius: BorderRadius.xs,
  },
  loadingContainer: {
    paddingVertical: Spacing["3xl"],
    alignItems: "center",
  },
  listContainer: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  listCover: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
  },
  listCoverPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  listInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    marginTop: Spacing.md,
  },
});
