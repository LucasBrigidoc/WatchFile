import { Platform } from "react-native";

const accentCyan = "#173DED"; // Palatinate Blue
const accentPurple = "#000051"; // Alucard Night

export const Colors = {
  light: {
    text: "#FFFFFF",
    textSecondary: "#BABABA", // Baby Grey
    buttonText: "#000029", // Black Russian
    tabIconDefault: "#7D8491", // Slate Blue
    tabIconSelected: accentCyan,
    link: accentCyan,
    accent: accentCyan,
    accentSecondary: accentPurple,
    backgroundRoot: "#000029", // Black Russian
    backgroundDefault: "#000051", // Alucard Night
    backgroundSecondary: "#1A1D29", // Midnight Blue
    backgroundTertiary: "#3D3F4A", // Charcoal Gray
    border: "#3D3F4A",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    star: accentCyan,
    glass: "rgba(26, 29, 41, 0.8)",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#BABABA", // Baby Grey
    buttonText: "#000029", // Black Russian
    tabIconDefault: "#7D8491", // Slate Blue
    tabIconSelected: accentCyan,
    link: accentCyan,
    accent: accentCyan,
    accentSecondary: accentPurple,
    backgroundRoot: "#000029", // Black Russian
    backgroundDefault: "#000051", // Alucard Night
    backgroundSecondary: "#1A1D29", // Midnight Blue
    backgroundTertiary: "#3D3F4A", // Charcoal Gray
    border: "#3D3F4A",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    star: accentCyan,
    glass: "rgba(26, 29, 41, 0.8)",
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
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const Gradients = {
  primary: ["#173DED", "#000051"],
  card: ["rgba(23, 61, 237, 0.15)", "rgba(0, 0, 81, 0.15)"],
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
