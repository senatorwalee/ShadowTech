type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryMuted: string;
  primaryPressed: string;
  primaryText: string;
  accent: string;
  accentMuted: string;
  accentText: string;
  success: string;
  warning: string;
  danger: string;
  streakBackground: string;
  streakIcon: string;
};

type ThemeScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type ThemeRadii = {
  sm: number;
  md: number;
  lg: number;
  pill: number;
};

export type AppTheme = {
  name: "light" | "dark";
  colors: ThemeColors;
  spacing: ThemeScale;
  radii: ThemeRadii;
};

export const lightTheme: AppTheme = {
  name: "light",
  colors: {
    background: "#FAFAF7",
    surface: "#FFFFFF",
    surfaceMuted: "#F3F5F2",
    border: "#D8DFDA",
    textPrimary: "#1F2933",
    textSecondary: "#667085",
    textMuted: "#8A9691",
    primary: "#0F766E",
    primaryMuted: "#E3F4F1",
    primaryPressed: "#115E59",
    primaryText: "#FFFFFF",
    accent: "#F9735B",
    accentMuted: "#FFF1ED",
    accentText: "#111827",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#DC2626",
    streakBackground: "#FFF7E6",
    streakIcon: "#F59E0B",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 6,
    md: 8,
    lg: 12,
    pill: 999,
  },
};

export const darkTheme: AppTheme = {
  name: "dark",
  colors: {
    background: "#0B1110",
    surface: "#111B19",
    surfaceMuted: "#172320",
    border: "#2A3A36",
    textPrimary: "#F4F7F5",
    textSecondary: "#A7B5B1",
    textMuted: "#7D8C87",
    primary: "#5EEAD4",
    primaryMuted: "#143733",
    primaryPressed: "#2DD4BF",
    primaryText: "#062724",
    accent: "#FF9C82",
    accentMuted: "#3A211B",
    accentText: "#111827",
    success: "#22C55E",
    warning: "#FBBF24",
    danger: "#F87171",
    streakBackground: "#31230B",
    streakIcon: "#FBBF24",
  },
  spacing: lightTheme.spacing,
  radii: lightTheme.radii,
};

export type ThemeName = AppTheme["name"];
