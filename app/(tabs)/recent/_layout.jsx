import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#3ddb92",
          backgroundColor: "#fff",


      },
      headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#008068"
      },
      headerShown: true
  }}>
        <Stack.Screen
        name='index'
        options={{
          headerTitle: "Recent Chats",
      }}
        />        
    </Stack>
  )
}

export default StackLayout