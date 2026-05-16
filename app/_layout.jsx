import React from "react";
import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { COLORS } from "../constants/theme";
import "../global.css";

const paperTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: COLORS.primary,
    },
};

export default function RootLayout() {
    return (
        <PaperProvider theme={paperTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="index" />
            </Stack>
        </PaperProvider>
    );
}