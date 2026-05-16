import React from "react";
import { Appearance } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import HeaderMenu from "../../components/HeaderMenu";
import { useAppTheme } from "../../constants/theme";

export default function TabLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const nwIsDark = colorScheme === "dark";
  const { isDark, colors } = useAppTheme({ isDark: nwIsDark });

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setColorScheme(next);
    Appearance.setColorScheme(next);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.surface,
          shadowColor: "#3ddb92",
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: colors.primary,
        },
        headerTintColor: colors.text,
        headerRight: () => (
          <HeaderMenu
            theme={{ colors }}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outline,
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
              color={focused ? colors.primary : colors.onSurfaceVariant}
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
              color={focused ? colors.primary : colors.onSurfaceVariant}
            />
          ),
        }}
      />
    </Tabs>
  );
}