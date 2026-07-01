import { createContext, useContext, type PropsWithChildren, type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { lightTheme, type AppTheme } from "./theme";

const ThemeContext = createContext<AppTheme>(lightTheme);

export function UiThemeProvider({ theme, children }: PropsWithChildren<{ theme: AppTheme }>) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(ThemeContext);
}

export function Screen({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const theme = useAppTheme();

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }, style]}>
      {children}
    </View>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          shadowColor: "#0B1110",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: theme.name === "dark" ? 0 : 0.06,
          shadowRadius: 22,
          elevation: theme.name === "dark" ? 0 : 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AppText({
  children,
  variant = "body",
  muted = false,
  style,
}: {
  children: ReactNode;
  variant?: "display" | "title" | "subtitle" | "body" | "caption";
  muted?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useAppTheme();

  return (
    <Text
      style={[
        styles.text,
        styles[variant],
        { color: muted ? theme.colors.textSecondary : theme.colors.textPrimary },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function PrimaryButton({
  children,
  disabled = false,
  style,
  ...props
}: PressableProps & { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.colors.primaryPressed : theme.colors.primary,
          borderRadius: theme.radii.pill,
          opacity: disabled ? 0.56 : 1,
        },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.buttonText, { color: theme.colors.primaryText }]}>{children}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  children,
  disabled = false,
  style,
  ...props
}: PressableProps & { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.pill,
          borderWidth: 1,
          opacity: disabled ? 0.56 : 1,
        },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.secondaryButtonText, { color: theme.colors.textPrimary }]}>
        {children}
      </Text>
    </Pressable>
  );
}

export function Badge({
  children,
  tone = "neutral",
  style,
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "accent";
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useAppTheme();
  const colors = {
    neutral: {
      background: theme.colors.surfaceMuted,
      text: theme.colors.textSecondary,
    },
    primary: {
      background: theme.colors.primaryMuted,
      text: theme.colors.primary,
    },
    success: {
      background: theme.colors.success,
      text: "#062724",
    },
    warning: {
      background: theme.colors.streakBackground,
      text: theme.colors.textPrimary,
    },
    accent: {
      background: theme.colors.accentMuted,
      text: theme.name === "dark" ? theme.colors.accent : theme.colors.accentText,
    },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }, style]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 0,
    padding: 18,
  },
  display: {
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 44,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
