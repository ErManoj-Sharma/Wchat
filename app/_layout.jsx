// app/_layout.jsx

import React from "react";

import { Stack } from "expo-router";

import {
    PaperProvider,
    MD3LightTheme,
} from "react-native-paper";

import "../global.css";

const theme = {
    ...MD3LightTheme,

    colors: {
        ...MD3LightTheme.colors,

        primary: "#00A884",
    },
};

export default function RootLayout() {
    return (
        <PaperProvider theme={theme}>
            <Stack
                screenOptions={{
                    headerShown: false,

                    contentStyle: {
                        backgroundColor:
                            "#FFFFFF",
                    },
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                />

                <Stack.Screen
                    name="index"
                />
            </Stack>
        </PaperProvider>
    );
}