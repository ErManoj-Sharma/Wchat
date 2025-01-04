import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
export default function App() {
  return (
    <View className="flex-1 bg-pink-400 items-center justify-center">
      <Text>This file in app/index.js</Text>
      <Link href="/home"> <Text>Jump to Home</Text></Link>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      <StatusBar style="auto" />
    </View>
  );
}

