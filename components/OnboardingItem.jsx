import { Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View className="flex-1  items-center justify-center" style={{ width }}>
            <Image source={item.image} className="flex-1 justify-center items-center" style={{ flex: 0.7, width, resizeMode: 'contain' }} />
            <View style={{ flex: 0.3 }}>
                <Text className="font-extrabold text-3xl mb-2.5 text-green text-center" >{item.title}</Text>
                <Text className="font-light text-[#62656b] text-center px-16" >{item.description}</Text>

            </View>
        </View>
    )
}

export default OnboardingItem  
