// service/storage.js

import AsyncStorage from "@react-native-async-storage/async-storage";

// ─────────────────────────────
// Get Data
// ─────────────────────────────

export const getDataWithTimestamp =
  async (key) => {
    try {
      const jsonValue =
        await AsyncStorage.getItem(
          key
        );

      return jsonValue != null
        ? JSON.parse(
          jsonValue
        )
        : [];
    } catch (e) {
      console.log(
        "Failed to load data",
        e
      );

      return [];
    }
  };

// ─────────────────────────────
// Set Full Data
// ─────────────────────────────

export const setDataWithTimestamp =
  async (key, value) => {
    try {
      const jsonValue =
        JSON.stringify(value);

      await AsyncStorage.setItem(
        key,
        jsonValue
      );
    } catch (e) {
      console.log(
        "Failed to save data",
        e
      );
    }
  };

// ─────────────────────────────
// Save Recent Chat
// Prevent duplicates
// Keep latest on top
// ─────────────────────────────

export const saveRecentChat =
  async (number) => {
    try {
      const existing =
        await getDataWithTimestamp(
          "@recent-chat-data"
        );

      const chats =
        Array.isArray(existing)
          ? existing
          : [];

      // Remove duplicate
      const filtered =
        chats.filter(
          (item) =>
            item.number !==
            number
        );

      // Add latest at top
      const updated = [
        {
          number,
          timestamp:
            new Date().toISOString(),
        },

        ...filtered,
      ];

      // Keep latest 30 only
      const limited =
        updated.slice(0, 30);

      await setDataWithTimestamp(
        "@recent-chat-data",
        limited
      );

      return limited;
    } catch (e) {
      console.log(
        "Failed to save recent chat",
        e
      );

      return [];
    }
  };