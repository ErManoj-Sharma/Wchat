import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#fff",
                    shadowColor: "#3ddb92",
                    backgroundColor: "#008068",


                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff"
                },
                headerShown: true
            }}>
            <Stack.Screen
                name='index'
                options={{
                    title: "Enter Number"

                }}
            />
        </Stack>
    )
}

export default StackLayout