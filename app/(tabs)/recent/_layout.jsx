import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: "Recent Chats",
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default StackLayout