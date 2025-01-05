import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function TabLayout() {
  return (
    <Tabs
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Chats',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={24}
              color={focused ? '#008068' : 'gray'} />),
          tabBarActiveTintColor: '#008068'

        }}
      />
      <Tabs.Screen
        name="recent"
        options={({ route }) => ({
          title: 'Recent',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "history" : "history"}
              size={24}
              color={focused ? '#008068' : 'gray'}
            />
          ),
          tabBarActiveTintColor: '#008068'

        })}
      />
    </Tabs>
  );
}
