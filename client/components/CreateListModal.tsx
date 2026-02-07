import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "@/components/TextInput";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { authFetch } from "@/lib/api";

interface CreateListModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateListModal({ visible, onClose, onCreated }: CreateListModalProps) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [coverUri, setCoverUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      setCoverUri(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await authFetch("/api/profile/lists", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          coverImage: coverUri || undefined,
        }),
      });
      if (res.ok) {
        setName("");
        setCoverUri(null);
        onCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error creating list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setCoverUri(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View style={[styles.sheet, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.handle}>
            <View style={[styles.handleBar, { backgroundColor: theme.textSecondary }]} />
          </View>

          <View style={styles.header}>
            <ThemedText type="h4" style={{ fontWeight: "700" }}>Nova Lista</ThemedText>
            <Pressable onPress={handleClose} hitSlop={10}>
              <Feather name="x" size={24} color={theme.textSecondary} />
            </Pressable>
          </View>

          <Pressable onPress={pickImage} style={styles.coverPicker}>
            {coverUri ? (
              <Image source={{ uri: coverUri }} style={styles.coverImage} contentFit="cover" />
            ) : (
              <View style={[styles.coverPlaceholder, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}>
                <Feather name="image" size={32} color={theme.textSecondary} />
                <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: Spacing.sm }}>
                  Adicionar Capa
                </ThemedText>
              </View>
            )}
            {coverUri && (
              <View style={styles.coverEditBadge}>
                <Feather name="edit-2" size={14} color="#FFFFFF" />
              </View>
            )}
          </Pressable>

          <TextInput
            placeholder="Nome da lista"
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <Pressable
            onPress={handleCreate}
            disabled={!name.trim() || loading}
            style={[
              styles.createButton,
              {
                backgroundColor: name.trim() ? theme.accent : theme.backgroundSecondary,
                opacity: loading ? 0.7 : 1,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <ThemedText type="body" style={{ color: "#FFFFFF", fontWeight: "600" }}>
                Criar Lista
              </ThemedText>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: Spacing.xl,
  },
  coverPicker: {
    marginBottom: Spacing.xl,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: 160,
    borderRadius: BorderRadius.md,
  },
  coverPlaceholder: {
    width: "100%",
    height: 160,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  coverEditBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  createButton: {
    height: 52,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
});
