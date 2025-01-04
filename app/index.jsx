import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>This file in app/index.js</Text>
      <Link href="/bills"> <Text>Jump to bills</Text></Link>
      <Link href="/bills"> <Text>Jump to bills</Text></Link> 
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});