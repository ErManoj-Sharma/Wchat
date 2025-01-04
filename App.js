import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { colorScheme, useColorScheme } from "nativewind";
export default function App() {
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark" | "light" | "system");
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
