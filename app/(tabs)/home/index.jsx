import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const page = () => {
    const router = useRouter();
    return (
        <View>
            <Text>Home index page</Text>
            <Button onPress={() => router.push("/bills/1")} title="go to first bill"></Button>
            <Button onPress={() => router.push("/bills/12122")} title="go to 2 bill"></Button>
            <Button onPress={() => router.replace("/")} title="go to Home"></Button>
        </View>
    )
}

export default page