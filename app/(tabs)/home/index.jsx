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

const WHATSAPP_GREEN = "#00A884";

const Home = () => {
    const [number, setNumber] = useState("");

    // ─────────────────────────────
    // Back Handler
    // ─────────────────────────────

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp();
            return true;
        };

        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => subscription.remove();
    }, []);

    // ─────────────────────────────
    // Validation
    // ─────────────────────────────

    const cleanedNumber = useMemo(
        () => number.replace(/\D/g, ""),
        [number]
    );

    const isValid = cleanedNumber.length === 10;

    // ─────────────────────────────
    // Handle Input
    // ─────────────────────────────

    const handleNumberChange = useCallback((text) => {
        const cleaned = text.replace(/\D/g, "").slice(0, 10);
        setNumber(cleaned);
    }, []);

    // ─────────────────────────────
    // Open WhatsApp
    // ─────────────────────────────

    const handleChatNow = useCallback(async () => {
        if (!isValid) return;

        // Dismiss keyboard before launching WhatsApp
        Keyboard.dismiss();

        try {
            await saveRecentChat(cleanedNumber);

            const url = `https://wa.me/91${cleanedNumber}`;

            await IntentLauncher.startActivityAsync(
                "android.intent.action.VIEW",
                {
                    data: url,
                    package: "com.whatsapp",
                }
            );
        } catch (error) {
            console.log("WhatsApp launch failed:", error);
            Linking.openURL(`https://wa.me/91${cleanedNumber}`);
        }
    }, [cleanedNumber, isValid]);

    return (
        // ─────────────────────────────────────────────────────────────
        // KeyboardAvoidingView with behavior="padding" on Android too.
        // This pushes the entire view UP by the keyboard height so the
        // button stays visible above the keyboard.
        // ─────────────────────────────────────────────────────────────
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
            style={{ flex: 1, backgroundColor: "#F8FAFC" }}
        >
            {/*
             * TouchableWithoutFeedback wraps everything so tapping
             * anywhere outside the input calls Keyboard.dismiss().
             */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingHorizontal: 22,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* HEADER */}
                    <View style={{ marginBottom: 36 }}>
                        <Text
                            variant="headlineMedium"
                            style={{
                                fontWeight: "700",
                                color: "#0F172A",
                                letterSpacing: -0.6,
                            }}
                        >
                            Start WhatsApp Chat
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{
                                marginTop: 8,
                                color: "#64748B",
                                lineHeight: 22,
                            }}
                        >
                            Enter a mobile number to quickly start chatting on
                            WhatsApp without saving the contact.
                        </Text>
                    </View>

                    {/* INPUT CARD */}
                    <View
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 24,
                            padding: 20,
                            shadowColor: "#000",
                            shadowOpacity: 0.05,
                            shadowRadius: 20,
                            elevation: 4,
                        }}
                    >
                        <TextInput
                            label="Mobile Number"
                            mode="outlined"
                            value={number}
                            onChangeText={handleNumberChange}
                            keyboardType="phone-pad"
                            maxLength={10}
                            autoFocus
                            left={<TextInput.Affix text="+91" />}
                            outlineStyle={{ borderRadius: 16 }}
                            contentStyle={{ fontSize: 16 }}
                            theme={{
                                colors: { primary: WHATSAPP_GREEN },
                            }}
                        />

                        {/* HELPER */}
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: isValid ? "#16A34A" : "#94A3B8",
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
                            onPress={handleChatNow}
                            disabled={!isValid}
                            contentStyle={{ height: 54 }}
                            style={{
                                marginTop: 24,
                                borderRadius: 16,
                                backgroundColor: WHATSAPP_GREEN,
                            }}
                            labelStyle={{
                                fontSize: 15,
                                fontWeight: "700",
                                letterSpacing: 0.3,
                            }}
                        >
                            Chat on WhatsApp
                        </Button>
                    </View>

                    {/* FOOTER */}
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 28,
                            fontSize: 12,
                            color: "#94A3B8",
                        }}
                    >
                        No contact will be saved to your phone.
                    </Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Home;