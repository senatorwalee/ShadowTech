import { AppText, useAppTheme } from "@nija-to-native/ui";
import { Link, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/sound-bank", label: "Sounds" },
  { href: "/progress", label: "Progress" },
  { href: "/profile", label: "Profile" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: "transparent",
          shadowColor: "#0B1110",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: theme.name === "dark" ? 0 : 0.08,
          shadowRadius: 24,
          elevation: theme.name === "dark" ? 0 : 4,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={[
              styles.tab,
              {
                backgroundColor: isActive ? theme.colors.primaryMuted : "transparent",
                borderColor: "transparent",
              },
            ]}
          >
            <AppText
              variant="caption"
              style={{
                color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                fontWeight: "700",
              }}
            >
              {tab.label}
            </AppText>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 0,
    flexDirection: "row",
    gap: 6,
    marginHorizontal: 20,
    padding: 6,
  },
  tab: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 9,
    textAlign: "center",
  },
});
