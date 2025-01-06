import { View, BackHandler } from 'react-native'
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from 'react'
import { storeDataWithTimestamp } from '../../../service/storage';
import * as IntentLauncher from 'expo-intent-launcher';
const Home = () => {

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


    const handleChatNow = async () => {
        const phoneNumber = encodeURIComponent(`+91${number}`);
        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;

        try {
            // Open the WhatsApp URL using Intent Launcher
            await storeDataWithTimestamp('@recent-chat-data', { number: number });
            await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: url,
                package: "com.whatsapp",
                type: "text/plain",  // Optional: MIME type to help with URL handling
            });
            console.log('WhatsApp opened successfully');

        } catch (error) {
            console.error('Error opening WhatsApp:', error);
        }
    }

    const handleNumberChange = (num) => {
        setNumber(num);
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
            <Button icon="chat" buttonColor='#00a884' textColor='white' mode="elevated" color={isValid ? '#00a884' : '#aaa'} disabled={!isValid} onPress={handleChatNow}>
                Chat Now
            </Button>
        </View>
    )
}

export default Home