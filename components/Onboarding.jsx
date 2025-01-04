import { View, FlatList, Animated } from 'react-native'
import { SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useRef } from 'react'
import slides from '../constant/slides'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Onboarding = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current

    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
        } else {
            console.log("at last slide")
            console.log("index : ", currentIndex)
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true')
                router.push("/home")
            } catch (error) {
                console.log("Error: @setItem - @viewedOnboarding -> ", error)
            }
        }
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View className="flex-1 items-center justify-center bg-white">
                <View style={{ flex: 3 }}>

                    <FlatList
                        data={slides}
                        renderItem={({ item }) => <OnboardingItem item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(item) => item.id}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        scrollEventThrottle={32}
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={slidesRef}
                    />
                </View>
                <Paginator data={slides} scrollX={scrollX} />
                <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
            </View>
        </SafeAreaView>
    )
}

export default Onboarding 