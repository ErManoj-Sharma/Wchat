// header menu for wchat appk
import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Menu } from "react-native-paper";
import { IMAGES } from "./../assets/images";
import AboutAppModal from "./../components/AboutAppModal";
import { useRouter } from "expo-router";

const HeaderMenu = ({ theme, isDark, toggleTheme }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [aboutVisible, setAboutVisible] = useState(false);
    const router = useRouter();

    const closeMenu = () => setMenuVisible(false);

    return (
        <View>
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                        style={{ paddingRight: 16 }}
                    >
                        <Image
                            source={IMAGES.menu}
                            style={{
                                width: 22,
                                height: 22,
                                tintColor: theme.colors.primary
                            }}
                        />
                    </TouchableOpacity>
                }
                contentStyle={{
                    backgroundColor: theme.colors.surface,
                    borderRadius: 12,
                }}
            >
                <Menu.Item
                    leadingIcon="theme-light-dark"
                    theme={{
                        colors: {
                            onSurfaceVariant: isDark ? "#fff" : "#000",
                        },
                    }}
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    titleStyle={{ color: theme.colors.text }}
                    onPress={() => {
                        closeMenu();
                        toggleTheme();
                    }}
                />

                <Menu.Item
                    leadingIcon="information-outline"
                    theme={{
                        colors: {
                            onSurfaceVariant: isDark ? "#fff" : "#000",
                        },
                    }}
                    title="About App"
                    titleStyle={{ color: theme.colors.text }}
                    onPress={() => {
                        closeMenu();
                        setTimeout(() => setAboutVisible(true), 300);
                    }}
                />

            </Menu>

            <AboutAppModal
                visible={aboutVisible}
                onClose={() => setAboutVisible(false)}
                theme={theme}
            />
        </View>
    );
};

export default HeaderMenu;