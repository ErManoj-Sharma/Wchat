import { View, BackHandler } from 'react-native'
import { Linking } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = () => {
    const router = useRouter();
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        } catch (error) {
            console.log("Error: @clearOnboarding -> ", error)
        }
    }

    useEffect(() => {
        const handleBackPress = () => {
            BackHandler.exitApp(); // Exit the app directly
            return true; // Prevent default back behavior
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);
    const [number, setNumber] = useState("");
    const [isValid, setIsValid] = useState(false);
  
    const { colors } = useTheme(); // Use theme for custom colors
  
    const handleChatNow = async() => {
        console.log(number)
        url = `https://api.whatsapp.com/send/?phone=%2B91${number}&text&type=phone_number&app_absent=0`
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
          } else {
            console.warn(`Don't know how to open URI: ${url}`);
          }
    }

    const handleNumberChange = (num) => {
        setNumber(num);
        console.log(num)
        if (num.length === 10) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const Br = () => <View style={{ height: 10 }} />;
    return (
        <View className="flex-1 justify-center items-center p-4 bg-white">
            <TextInput
                label="Mobile No"
                value={number}
                mode='outlined'
                onChangeText={handleNumberChange}
                keyboardType="numeric"
              
                theme={{
                    colors: {
                        primary: '#00a884', // Custom color for input focus
                        placeholder: '#00a884', // Placeholder color
                        text: '#00a884', // Text color
                        background: '#fff', // Input background color
                        error: '#f00', // Error color for validation
                    },
                }}
                style={{ width: '100%' }}
            />
            <Br />
            <Button icon="chat" buttonColor='#00a884' textColor='white' mode="elevated"  color={isValid ? '#00a884' : '#aaa'} disabled={!isValid} onPress={handleChatNow}>
                Chat Now
            </Button>

        </View>
    )
}

export default Home