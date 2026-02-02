import { Platform } from "react-native";

const accentNeonBlue = "#007BFF";
const accentPurple = "#6C63FF";

export const Colors = {
  light: {
    text: "#FFFFFF",
    textSecondary: "#9CA3AF",
    buttonText: "#0D0D0D",
    tabIconDefault: "#6B7280",
    tabIconSelected: accentNeonBlue,
    link: accentNeonBlue,
    accent: accentNeonBlue,
    accentSecondary: accentPurple,
    backgroundRoot: "#0D0D0D",
    backgroundDefault: "#1A1A1A",
    backgroundSecondary: "#242424",
    backgroundTertiary: "#2E2E2E",
    border: "#2A2A2A",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    star: accentNeonBlue,
    glass: "rgba(26, 26, 26, 0.8)",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#9CA3AF",
    buttonText: "#0D0D0D",
    tabIconDefault: "#6B7280",
    tabIconSelected: accentNeonBlue,
    link: accentNeonBlue,
    accent: accentNeonBlue,
    accentSecondary: accentPurple,
    backgroundRoot: "#0D0D0D",
    backgroundDefault: "#1A1A1A",
    backgroundSecondary: "#242424",
    backgroundTertiary: "#2E2E2E",
    border: "#2A2A2A",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    star: accentNeonBlue,
    glass: "rgba(26, 26, 26, 0.8)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
  },
  h2: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
  },
  h3: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
  },
  h4: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  body: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  small: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  caption: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const,
  },
  link: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
};

export const Shadows = {
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fab: {
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const Gradients = {
  primary: ["#007BFF", "#007BFF"],
  card: ["rgba(0, 123, 255, 0.15)", "rgba(0, 123, 255, 0.15)"],
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
