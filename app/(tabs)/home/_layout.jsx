import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
    return (
        <Stack
        >
            <Stack.Screen
                name='index'
                options={{
                    title: "Direct Chat", headerShown: false

                }}
            />
        </Stack>
    )
}

export default StackLayout