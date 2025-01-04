import {  TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
const NextButton = ({ percentage, scrollTo }) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef(null)
    const animation = (toValue) => {
        return Animated.timing(progressAnimation, { toValue, duration: 250, useNativeDriver: false }).start()
    }
    useEffect(() => { 
        animation(percentage)
    }, [percentage])

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })  
            }
        }, [percentage])

        return () => {
            progressAnimation.removeAllListeners();
        }
    }, [])
    return (
        <View className="justify-center items-center flex-1" >
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>
                    <Circle  stroke="#f5f6f7" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                    <Circle 
                     fill="white"
                        ref={progressRef}
                        stroke="#008068"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>

            </Svg>
            <TouchableOpacity onPress={scrollTo} className="absolute bg-green p-5 rounded-full"  activeOpacity={0.6}>
                <AntDesign name='arrowright' size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default NextButton
