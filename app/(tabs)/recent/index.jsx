import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const page = () => {
    const router = useRouter();
    return (
        <View>
            <Text>Recent index page</Text>
        </View>
    )
}

export default page