import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    View,
    BackHandler,
    Linking,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";

import {
    Button,
    Text,
    TextInput,
} from "react-native-paper";

import * as IntentLauncher from "expo-intent-launcher";

import { saveRecentChat } from "../../../service/storage";
import BackgroundSvg from "../../../components/BackgroundSvg";
import { useAppTheme } from "../../../constants/theme";

const Home = () => {
    const [number, setNumber] =
        useState("");

    const { isDark, colors } = useAppTheme();

    // ─────────────────────────────
    // Back Handler
    // ─────────────────────────────

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp();

            return true;
        };

        const subscription =
            BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPress
            );

        return () =>
            subscription.remove();
    }, []);

    // ─────────────────────────────
    // Validation
    // ─────────────────────────────

    const cleanedNumber =
        useMemo(
            () =>
                number.replace(
                    /\D/g,
                    ""
                ),
            [number]
        );

    const isValid =
        cleanedNumber.length === 10;

    // ─────────────────────────────
    // Handle Input
    // ─────────────────────────────

    const handleNumberChange =
        useCallback((text) => {
            const cleaned =
                text
                    .replace(/\D/g, "")
                    .slice(0, 10);

            setNumber(cleaned);
        }, []);

    // ─────────────────────────────
    // Open WhatsApp
    // ─────────────────────────────

    const handleChatNow =
        useCallback(async () => {
            if (!isValid) return;

            Keyboard.dismiss();

            try {
                await saveRecentChat(
                    cleanedNumber
                );

                const url =
                    `https://wa.me/91${cleanedNumber}`;

                await IntentLauncher.startActivityAsync(
                    "android.intent.action.VIEW",
                    {
                        data: url,
                        package:
                            "com.whatsapp",
                    }
                );
            } catch (error) {
                console.log(
                    "WhatsApp launch failed:",
                    error
                );

                Linking.openURL(
                    `https://wa.me/91${cleanedNumber}`
                );
            }
        }, [
            cleanedNumber,
            isValid,
        ]);

    return (
        <KeyboardAvoidingView
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "padding"
            }
            keyboardVerticalOffset={
                Platform.OS ===
                    "android"
                    ? 80
                    : 0
            }
            style={{
                flex: 1,

                backgroundColor:
                    colors.background,
            }}
        >
            <BackgroundSvg />
            <TouchableWithoutFeedback
                onPress={
                    Keyboard.dismiss
                }
                accessible={false}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,

                        justifyContent:
                            "center",

                        paddingHorizontal: 22,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={
                        false
                    }
                >


                    {/* HEADER */}

                    <View
                        style={{
                            marginBottom: 34,
                        }}
                    >
                        <Text
                            variant="headlineMedium"
                            style={{
                                fontWeight:
                                    "800",

                                color:
                                    colors.primary,

                                letterSpacing:
                                    -0.8,

                                textAlign:
                                    "center",
                            }}
                        >
                            Start WhatsApp
                            Chat
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{
                                marginTop: 10,

                                color:
                                    colors.secondaryText,

                                lineHeight: 24,

                                textAlign:
                                    "center",

                                fontSize: 15,
                            }}
                        >
                            Instantly start
                            a WhatsApp chat
                            without saving
                            the contact.
                        </Text>
                    </View>

                    {/* CARD */}

                    <View
                        style={{
                            backgroundColor:
                                colors.card,

                            borderRadius: 30,

                            padding: 22,

                            borderWidth: 1,

                            borderColor:
                                colors.border,

                            shadowColor:
                                "#000",

                            shadowOpacity:
                                isDark
                                    ? 0.18
                                    : 0.05,

                            shadowRadius: 20,

                            elevation: 5,
                        }}
                    >
                        {/* INPUT */}

                        <TextInput
                            label="Mobile Number"
                            mode="outlined"
                            value={number}
                            onChangeText={
                                handleNumberChange
                            }
                            keyboardType="phone-pad"
                            maxLength={10}
                            autoFocus
                            left={
                                <TextInput.Affix text="+91" />
                            }
                            outlineStyle={{
                                borderRadius: 18,
                            }}
                            contentStyle={{
                                fontSize: 17,

                                color:
                                    colors.text,
                            }}
                            style={{
                                backgroundColor:
                                    colors.inputBackground,
                            }}
                            theme={{
                                dark: isDark,

                                colors: {
                                    primary:
                                        colors.primary,

                                    text:
                                        colors.text,

                                    placeholder:
                                        colors.secondaryText,

                                    background:
                                        colors.inputBackground,

                                    outline:
                                        colors.border,
                                },
                            }}
                        />

                        {/* HELPER */}

                        <Text
                            style={{
                                marginTop: 12,

                                fontSize: 13,

                                color: isValid
                                    ? colors.success
                                    : colors.secondaryText,
                            }}
                        >
                            {isValid
                                ? "✓ Valid mobile number"
                                : "Enter 10-digit mobile number"}
                        </Text>

                        {/* BUTTON */}

                        <Button
                            mode="contained"
                            icon="whatsapp"
                            onPress={
                                handleChatNow
                            }
                            disabled={!isValid}
                            contentStyle={{
                                height: 58,
                            }}
                            style={{
                                marginTop: 26,

                                borderRadius: 18,

                                backgroundColor:
                                    colors.primary,
                            }}
                            labelStyle={{
                                fontSize: 16,

                                fontWeight:
                                    "800",

                                letterSpacing:
                                    0.3,
                            }}
                        >
                            Continue to
                            WhatsApp
                        </Button>
                    </View>

                    {/* FOOTER */}

                    <Text
                        style={{
                            textAlign:
                                "center",

                            marginTop: 28,

                            fontSize: 12,

                            color:
                                colors.secondaryText,

                            lineHeight: 20,
                        }}
                    >
                        Your contacts
                        remain private and
                        are never stored
                        automatically.
                    </Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Home;