import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { useFocusEffect } from "expo-router";

import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
    Animated,
    Platform,
    useColorScheme,
} from "react-native";

import {
    Avatar,
    IconButton,
    Menu,
    Divider,
} from "react-native-paper";

import * as IntentLauncher from "expo-intent-launcher";
import * as Clipboard from "expo-clipboard";
import * as Contacts from "expo-contacts";

import {
    getDataWithTimestamp,
    setDataWithTimestamp,
    saveRecentChat,
} from "../service/storage";

const WHATSAPP_GREEN = "#1DAA61";

const RecentList = () => {
    const colorScheme =
        useColorScheme();

    const isDark =
        colorScheme === "dark";

    // ─────────────────────────────
    // Theme
    // ─────────────────────────────

    const COLORS = {
        surface: isDark
            ? "#1E293B"
            : "#F3F4F6",

        border: isDark
            ? "#334155"
            : "#E5E7EB",

        primary:
            WHATSAPP_GREEN,

        text: isDark
            ? "#F8FAFC"
            : "#111827",

        subtext: isDark
            ? "#94A3B8"
            : "#6B7280",

        danger: "#EF4444",

        avatarBg: isDark
            ? "#111827"
            : "#ECECEC",

        avatarIcon: isDark
            ? "#CBD5E1"
            : "#6B7280",

        skeleton: isDark
            ? "#1E293B"
            : "#E5E7EB",

        toastBg: isDark
            ? "#020617"
            : "#1F2937",
    };

    // ─────────────────────────────
    // State
    // ─────────────────────────────

    const [recentChats, setRecentChats] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [menuVisible, setMenuVisible] =
        useState(null);

    const [toast, setToast] =
        useState({
            visible: false,
            message: "",
        });

    const toastTimer =
        useRef(null);

    // ─────────────────────────────
    // Toast
    // ─────────────────────────────

    const showToast =
        useCallback((message) => {
            if (
                toastTimer.current
            ) {
                clearTimeout(
                    toastTimer.current
                );
            }

            setToast({
                visible: true,
                message,
            });

            toastTimer.current =
                setTimeout(() => {
                    setToast({
                        visible: false,
                        message: "",
                    });
                }, 2000);
        }, []);

    useEffect(() => {
        return () => {
            if (
                toastTimer.current
            ) {
                clearTimeout(
                    toastTimer.current
                );
            }
        };
    }, []);

    // ─────────────────────────────
    // Menu
    // ─────────────────────────────

    const openMenu =
        useCallback((id) => {
            setMenuVisible(id);
        }, []);

    const closeMenu =
        useCallback(() => {
            setMenuVisible(null);
        }, []);

    // ─────────────────────────────
    // Remove Duplicates
    // ─────────────────────────────

    const removeDuplicateChats =
        useCallback(
            (chats = []) => {
                const latestMap =
                    new Map();

                chats.forEach(
                    (chat) => {
                        const existing =
                            latestMap.get(
                                chat.number
                            );

                        if (
                            !existing ||
                            new Date(
                                chat.timestamp
                            ) >
                            new Date(
                                existing.timestamp
                            )
                        ) {
                            latestMap.set(
                                chat.number,
                                chat
                            );
                        }
                    }
                );

                return Array.from(
                    latestMap.values()
                ).sort(
                    (a, b) =>
                        new Date(
                            b.timestamp
                        ) -
                        new Date(
                            a.timestamp
                        )
                );
            },
            []
        );

    // ─────────────────────────────
    // Fetch Chats
    // ─────────────────────────────

    const fetchChats =
        useCallback(async () => {
            try {
                setLoading(true);

                const data =
                    await getDataWithTimestamp(
                        "@recent-chat-data"
                    );

                setRecentChats(
                    removeDuplicateChats(
                        Array.isArray(
                            data
                        )
                            ? data
                            : []
                    )
                );
            } catch (error) {
                console.log(
                    "Recent chats error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }, [
            removeDuplicateChats,
        ]);

    useFocusEffect(
        useCallback(() => {
            fetchChats();
        }, [fetchChats])
    );

    // ─────────────────────────────
    // Sorted Chats
    // ─────────────────────────────

    const sortedChats =
        useMemo(() => {
            return [
                ...recentChats,
            ].sort(
                (a, b) =>
                    new Date(
                        b.timestamp
                    ) -
                    new Date(
                        a.timestamp
                    )
            );
        }, [recentChats]);

    // ─────────────────────────────
    // Format Date
    // ─────────────────────────────

    const formatDate =
        useCallback((iso) => {
            const date =
                new Date(iso);

            const today =
                new Date();

            const yesterday =
                new Date(today);

            yesterday.setDate(
                today.getDate() -
                1
            );

            if (
                date.toDateString() ===
                today.toDateString()
            )
                return "Today";

            if (
                date.toDateString() ===
                yesterday.toDateString()
            )
                return "Yesterday";

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }
            );
        }, []);

    // ─────────────────────────────
    // Open Chat
    // ─────────────────────────────

    const openChat =
        useCallback(
            async (number) => {
                try {
                    const updated =
                        await saveRecentChat(
                            number
                        );

                    setRecentChats(
                        removeDuplicateChats(
                            updated
                        )
                    );

                    const url =
                        `https://wa.me/91${number}`;

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
                        error
                    );

                    Linking.openURL(
                        `https://wa.me/91${number}`
                    );
                }
            },
            [
                removeDuplicateChats,
            ]
        );

    // ─────────────────────────────
    // Copy Number
    // ─────────────────────────────

    const copyNumber =
        useCallback(
            async (number) => {
                await Clipboard.setStringAsync(
                    number
                );

                showToast(
                    "Number copied"
                );
            },
            [showToast]
        );

    // ─────────────────────────────
    // Save Contact
    // ─────────────────────────────

    const saveToContacts =
        useCallback(
            async (number) => {
                const fullNumber =
                    `+91${number}`;

                try {
                    if (
                        Platform.OS ===
                        "android"
                    ) {
                        await IntentLauncher.startActivityAsync(
                            "android.intent.action.INSERT",
                            {
                                type: "vnd.android.cursor.dir/contact",

                                extra: {
                                    phone:
                                        fullNumber,

                                    phone_type:
                                        "2",
                                },
                            }
                        );
                    } else {
                        const {
                            status,
                        } =
                            await Contacts.requestPermissionsAsync();

                        if (
                            status !==
                            "granted"
                        ) {
                            Alert.alert(
                                "Permission denied"
                            );

                            return;
                        }

                        await Contacts.addContactAsync(
                            {
                                [Contacts.Fields.PhoneNumbers]:
                                    [
                                        {
                                            number:
                                                fullNumber,

                                            label:
                                                "mobile",
                                        },
                                    ],
                            }
                        );

                        showToast(
                            "Contact saved"
                        );
                    }
                } catch (error) {
                    console.log(
                        error
                    );

                    Alert.alert(
                        "Error",
                        "Could not open contacts."
                    );
                }
            },
            [showToast]
        );

    // ─────────────────────────────
    // Delete Chat
    // ─────────────────────────────

    const deleteChat =
        useCallback(
            async (number) => {
                try {
                    const updated =
                        recentChats.filter(
                            (
                                item
                            ) =>
                                item.number !==
                                number
                        );

                    setRecentChats(
                        updated
                    );

                    await setDataWithTimestamp(
                        "@recent-chat-data",
                        updated
                    );

                    showToast(
                        "Chat removed"
                    );
                } catch (error) {
                    console.log(
                        error
                    );
                }
            },
            [
                recentChats,
                showToast,
            ]
        );

    // ─────────────────────────────
    // Confirm Delete
    // ─────────────────────────────

    const confirmDelete =
        useCallback(
            (number) => {
                Alert.alert(
                    "Remove Chat",
                    `Remove +91 ${number} from recents?`,
                    [
                        {
                            text: "Cancel",
                            style:
                                "cancel",
                        },

                        {
                            text: "Remove",

                            style:
                                "destructive",

                            onPress:
                                () =>
                                    deleteChat(
                                        number
                                    ),
                        },
                    ]
                );
            },
            [deleteChat]
        );

    // ─────────────────────────────
    // Skeleton Loader
    // ─────────────────────────────

    const SkeletonItem = () => {
        const anim =
            useRef(
                new Animated.Value(
                    0.4
                )
            ).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence(
                    [
                        Animated.timing(
                            anim,
                            {
                                toValue: 1,
                                duration: 800,
                                useNativeDriver:
                                    true,
                            }
                        ),

                        Animated.timing(
                            anim,
                            {
                                toValue: 0.4,
                                duration: 800,
                                useNativeDriver:
                                    true,
                            }
                        ),
                    ]
                )
            ).start();
        }, []);

        return (
            <Animated.View
                style={{
                    marginHorizontal: 12,

                    marginBottom: 10,

                    backgroundColor:
                        COLORS.surface,

                    borderWidth: 1,

                    borderColor:
                        COLORS.border,

                    borderRadius: 22,

                    paddingHorizontal: 14,

                    paddingVertical: 14,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    opacity: anim,
                }}
            >
                <View
                    style={{
                        width: 58,
                        height: 58,

                        borderRadius: 29,

                        backgroundColor:
                            COLORS.skeleton,
                    }}
                />

                <View
                    style={{
                        flex: 1,

                        marginLeft: 14,

                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            width: "60%",

                            height: 18,

                            borderRadius: 8,

                            backgroundColor:
                                COLORS.skeleton,
                        }}
                    />

                    <View
                        style={{
                            width: "40%",

                            height: 13,

                            borderRadius: 6,

                            backgroundColor:
                                COLORS.skeleton,
                        }}
                    />
                </View>
            </Animated.View>
        );
    };

    // ─────────────────────────────
    // Loading
    // ─────────────────────────────

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {[1, 2, 3, 4].map(
                    (i) => (
                        <SkeletonItem
                            key={i}
                        />
                    )
                )}
            </View>
        );
    }

    // ─────────────────────────────
    // Empty State
    // ─────────────────────────────

    if (
        sortedChats.length === 0
    ) {
        return (
            <View
                style={{
                    flex: 1,

                    justifyContent:
                        "center",

                    alignItems:
                        "center",

                    paddingHorizontal: 24,
                }}
            >
                <Image
                    source={require("../assets/images/no_data.png")}
                    style={{
                        width: 220,
                        height: 220,

                        resizeMode:
                            "contain",
                    }}
                />

                <Text
                    style={{
                        fontSize: 24,

                        fontWeight:
                            "700",

                        color:
                            COLORS.text,

                        marginTop: 10,
                    }}
                >
                    No Recent Chats
                </Text>

                <Text
                    style={{
                        marginTop: 8,

                        textAlign:
                            "center",

                        fontSize: 14,

                        lineHeight: 22,

                        color:
                            COLORS.subtext,
                    }}
                >
                    Your recent chats
                    will appear here.
                </Text>
            </View>
        );
    }

    // ─────────────────────────────
    // Render Item
    // ─────────────────────────────

    const renderItem = ({
        item,
    }) => (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
                openChat(
                    item.number
                )
            }
            style={{
                marginHorizontal: 12,

                marginBottom: 10,

                backgroundColor:
                    COLORS.surface,

                borderWidth: 1,

                borderColor:
                    COLORS.border,

                borderRadius: 22,

                paddingHorizontal: 14,

                paddingVertical: 14,

                flexDirection:
                    "row",

                alignItems:
                    "center",

                shadowColor:
                    "#000",

                shadowOffset: {
                    width: 0,
                    height: 6,
                },

                shadowOpacity:
                    isDark
                        ? 0.25
                        : 0.08,

                shadowRadius: 14,

                elevation: 8,
            }}
        >
            <Avatar.Icon
                size={58}
                icon="account"
                color={
                    COLORS.avatarIcon
                }
                style={{
                    backgroundColor:
                        COLORS.avatarBg,
                }}
            />

            <View
                style={{
                    flex: 1,

                    marginLeft: 14,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 20,

                        fontWeight:
                            "600",

                        color:
                            COLORS.text,
                    }}
                >
                    +91{" "}
                    {item.number}
                </Text>

                <Text
                    style={{
                        fontSize: 14,

                        color:
                            COLORS.subtext,

                        marginTop: 4,
                    }}
                >
                    Open WhatsApp
                    Chat
                </Text>
            </View>

            <View
                style={{
                    alignItems:
                        "flex-end",

                    justifyContent:
                        "space-between",

                    height: 58,
                }}
            >
                <Text
                    style={{
                        fontSize: 12,

                        color:
                            COLORS.subtext,

                        fontWeight:
                            "500",
                    }}
                >
                    {formatDate(
                        item.timestamp
                    )}
                </Text>

                <Menu
                    visible={
                        menuVisible ===
                        item.number
                    }
                    onDismiss={
                        closeMenu
                    }
                    anchor={
                        <IconButton
                            icon="dots-vertical"
                            size={20}
                            iconColor={
                                COLORS.subtext
                            }
                            style={{
                                margin: 0,
                            }}
                            onPress={() =>
                                openMenu(
                                    item.number
                                )
                            }
                        />
                    }
                >
                    <Menu.Item
                        leadingIcon="account-plus"
                        title="Save to Contacts"
                        onPress={() => {
                            closeMenu();

                            saveToContacts(
                                item.number
                            );
                        }}
                    />

                    <Menu.Item
                        leadingIcon="content-copy"
                        title="Copy Number"
                        onPress={() => {
                            closeMenu();

                            copyNumber(
                                item.number
                            );
                        }}
                    />

                    <Divider />

                    <Menu.Item
                        leadingIcon="delete-outline"
                        title="Remove"
                        titleStyle={{
                            color:
                                COLORS.danger,
                        }}
                        onPress={() => {
                            closeMenu();

                            confirmDelete(
                                item.number
                            );
                        }}
                    />
                </Menu>
            </View>
        </TouchableOpacity>
    );

    // ─────────────────────────────
    // Toast
    // ─────────────────────────────

    const ToastBar = () => {
        const opacity =
            useRef(
                new Animated.Value(
                    0
                )
            ).current;

        useEffect(() => {
            if (
                toast.visible
            ) {
                Animated.sequence(
                    [
                        Animated.timing(
                            opacity,
                            {
                                toValue: 1,
                                duration: 200,
                                useNativeDriver:
                                    true,
                            }
                        ),

                        Animated.delay(
                            1800
                        ),

                        Animated.timing(
                            opacity,
                            {
                                toValue: 0,
                                duration: 300,
                                useNativeDriver:
                                    true,
                            }
                        ),
                    ]
                ).start();
            }
        }, [
            toast.visible,
            toast.message,
        ]);

        if (!toast.visible)
            return null;

        return (
            <Animated.View
                style={{
                    position:
                        "absolute",

                    bottom: 28,

                    alignSelf:
                        "center",

                    backgroundColor:
                        COLORS.toastBg,

                    paddingHorizontal: 20,

                    paddingVertical: 12,

                    borderRadius: 100,

                    opacity,

                    shadowColor:
                        "#000",

                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },

                    shadowOpacity: 0.2,

                    shadowRadius: 8,

                    elevation: 6,
                }}
            >
                <Text
                    style={{
                        color:
                            "#FFFFFF",

                        fontSize: 14,

                        fontWeight:
                            "500",
                    }}
                >
                    {toast.message}
                </Text>
            </Animated.View>
        );
    };

    // ─────────────────────────────
    // Main Render
    // ─────────────────────────────

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* HEADER */}

            <View
                style={{
                    paddingHorizontal: 18,

                    paddingTop: 18,

                    paddingBottom: 14,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,

                        color:
                            COLORS.subtext,
                    }}
                >
                    Quickly reopen
                    your WhatsApp
                    chats
                </Text>

                <View
                    style={{
                        backgroundColor:
                            isDark
                                ? "rgba(0,168,132,0.15)"
                                : `${WHATSAPP_GREEN}18`,

                        borderRadius: 10,

                        paddingHorizontal: 10,

                        paddingVertical: 4,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,

                            fontWeight:
                                "700",

                            color:
                                WHATSAPP_GREEN,
                        }}
                    >
                        {
                            sortedChats.length
                        }
                    </Text>
                </View>
            </View>

            {/* LIST */}

            <FlatList
                data={sortedChats}
                keyExtractor={(
                    item
                ) =>
                    item.number
                }
                renderItem={
                    renderItem
                }
                contentContainerStyle={{
                    paddingBottom: 32,

                    paddingTop: 4,
                }}
                showsVerticalScrollIndicator={
                    false
                }
            />

            {/* TOAST */}

            <ToastBar />
        </View>
    );
};

export default RecentList;