import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, lightTheme, UiThemeProvider } from "@nija-to-native/ui";
import { StatusBar } from "expo-status-bar";
import { useMemo, type PropsWithChildren } from "react";
import { useColorScheme } from "react-native";

export function AppProviders({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 7 * 24 * 60 * 60 * 1000,
            retry: 2,
          },
        },
      }),
    [],
  );
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <UiThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        {children}
      </QueryClientProvider>
    </UiThemeProvider>
  );
}
