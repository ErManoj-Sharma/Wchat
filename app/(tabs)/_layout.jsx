// app/(tabs)/_layout.jsx for WChat app

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import HeaderMenu from "../../components/HeaderMenu";

const WHATSAPP_GREEN = "#008068";

const LightTheme = {
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",

    text: "#0F172A",

    outline: "#E5E7EB",

    onSurfaceVariant:
      "#64748B",

    primary:
      WHATSAPP_GREEN,

    card: "#FFFFFF",

    inputBackground:
      "#FFFFFF",
  },
};

const DarkTheme = {
  colors: {
    // Main backgrounds
    background: "#0F172A",

    surface: "#111827",

    // Main text
    text: "#F9FAFB",

    // Borders
    outline: "#374151",

    // Secondary text
    onSurfaceVariant:
      "#9CA3AF",

    // Brand
    primary:
      WHATSAPP_GREEN,

    // Cards
    card: "#1E293B",

    // Inputs
    inputBackground:
      "#111827",
  },
};

export default function TabLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : LightTheme;

  const toggleTheme = () => setColorScheme(isDark ? "light" : "dark");

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        // ─── Header styling ───
        headerStyle: {
          backgroundColor: theme.colors.surface,
          shadowColor: "#3ddb92",
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: WHATSAPP_GREEN,
        },
        headerTintColor: theme.colors.text,
        headerRight: () => (
          <HeaderMenu
            theme={theme}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        ),
        // ─── Tab bar styling ───
        tabBarActiveTintColor: WHATSAPP_GREEN,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={24}
              color={focused ? WHATSAPP_GREEN : theme.colors.onSurfaceVariant}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recent"
        options={{
          title: "Recent",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={focused ? WHATSAPP_GREEN : theme.colors.onSurfaceVariant}
            />
          ),
        }}
      />
    </Tabs>
  );
}