// src/Components/AboutAppModal.jsx
import React from "react";
import {
  View,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import { Modal, Portal, Text, Button, Divider } from "react-native-paper";
import { IMAGES } from "../assets/images";

const AboutAppModal = ({ visible, onClose, theme }) => {
  const getCopyrightText = () => {
    const year = new Date().getFullYear();

    return `© ${year} Wchat by Manoj Sharma`;
  };
  const openMail = () => {
    Linking.openURL("mailto:manoj.sharma.webdev@gmail.com?subject=WChat Support");
  };

  const openPortfolio = () => {
    Linking.openURL("https://manoj-sharma-portfolio.vercel.app/");
  };

  const openGitHub = () => {
    Linking.openURL("https://github.com/ErManoj-Sharma/Wchat/releases/latest/download/Wchat.apk");
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          marginHorizontal: 16,
          padding: 20,
          maxHeight: "85%",
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {/* 🧾 App Logo and Title */}
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Image
                source={IMAGES.logo}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 8,
                  borderRadius: 50
                }}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: theme.colors.primary,
                }}
              >
                Wchat
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.text,
                  marginTop: 2,
                }}
              >
                v1.0.0
              </Text>
            </View>

            {/* 🧠 App Description */}
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 16,
                lineHeight: 20,
              }}
            >
              WChat lets you start WhatsApp chats instantly without saving contacts. Clean, fast, lightweight, and privacy-friendly with recent chat history support.

            </Text>

            <Divider style={{ marginVertical: 12, opacity: 0.3 }} />

            {/* 👨‍💻 Developer Info */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: theme.colors.primary,
                  marginBottom: 8,
                }}
              >
                Developer
              </Text>
              <Text style={{ color: theme.colors.text }}>Manoj Sharma</Text>
              <Text style={{ color: theme.colors.text }}>
                React Native Developer
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  marginTop: 4,
                  fontSize: 13,
                }}
              >
                Built with React Native + Expo
              </Text>
            </View>

            {/* 🔗 Links */}
            <Button
              icon="email-outline"
              mode="outlined"
              onPress={openMail}
              style={{ marginBottom: 8 }}
            >
              Contact Developer
            </Button>
            <Button
              icon="web"
              mode="outlined"
              onPress={openPortfolio}
              style={{ marginBottom: 8 }}
            >
              View Portfolio
            </Button>
            <Button icon="github" mode="outlined" onPress={openGitHub}>
              Download Latest Version
            </Button>

            <Divider style={{ marginVertical: 16, opacity: 0.3 }} />

            {/* ✨ Footer */}
            <Text
              style={{
                textAlign: "center",
                color: theme.colors.primary,
                fontSize: 12,
              }}
            >{getCopyrightText()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

export default AboutAppModal;
