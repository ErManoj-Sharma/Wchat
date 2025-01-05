import { View, BackHandler } from 'react-native'
import { Linking } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeDataWithTimestamp } from '../../../service/storage';
const Home = () => {
    const router = useRouter();
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        } catch (error) {
            console.log("Error: @clearOnboarding -> ", error)
        }
    }

    const [snackVisible, setSnackVisible] = useState(false);
    const [snackText, setSnackText] = useState('');

    const showSnack = (text) => {
        setSnackText(text);
        setSnackVisible(true);
    };

    const onDismissSnackBar = () => {
        setSnackVisible(false);
    };

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

    const handleChatNow = async () => {
        console.log(number)

        showSnack(`Number: ${number}`);
        // console.log("testing with google")
        // const s = await Linking.canOpenURL("https://google.com");
        // if (s){
        //     await Linking.openURL("https://google.com");
        // }
        // console.log("testing with google")
        url = `https://api.whatsapp.com/send/?phone=%2B91${number}&text&type=phone_number&app_absent=0`
        showSnack(`URL: ${url}`);
        const supported = await Linking.canOpenURL(url);
        showSnack(`Supported: ${supported}`);
        if (supported) {
            try {
                await storeDataWithTimestamp('@recent-chat-data', { number: number });
                showSnack(`Data saved`);
                // Update UI or state after successful storage
            } catch (error) {
                console.error("Error storing data:", error);
                showSnack(`Error saving data: ${error.message}`);
            }
            Snack(`Linking Whatsapp`)
            await Linking.openURL(url);
            showSnack(`WhatsApp opened`);
        } else {
            console.warn(`Don't know how to open URI: ${url}`);
            showSnack(`Error opening WhatsApp: ${error.message}`);
        }

        return (
            <View>
                {/* Snackbar */}
                <Snackbar
                    visible={snackVisible}
                    onDismiss={onDismissSnackBar}
                    duration={2000}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Handle undo action
                        },
                    }}
                >
                    {snackText}
                </Snackbar>
            </View>
        );
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
    const Snack = (text) => <View><Snackbar
        visible={true}
        onDismiss={onDismissSnackBar}
        duration={500}
        elevation={5}
        action={{
            label: 'Undo',
            onPress: () => {
                // Do something
            },
        }}>
        {text}
    </Snackbar>
    </View>


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
            <Button icon="chat" buttonColor='#00a884' textColor='white' mode="elevated" color={isValid ? '#00a884' : '#aaa'} disabled={!isValid} onPress={handleChatNow}>
                Chat Now
            </Button>

        </View>
    )
}

export default Home