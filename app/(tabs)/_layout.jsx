import { Tabs } from 'expo-router';
import { Image,StyleSheet  } from 'react-native';
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: 'home',
          headerShown: false ,
          }} // Hide header for home tab
      />
      <Tabs.Screen
        name="recent"
        options={{ title: 'recent', headerShown: false }} // Hide header for Exam and Jobs tab
      />
    </Tabs>
  );
}
