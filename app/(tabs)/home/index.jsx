import { View, BackHandler,StyleSheet, Text } from 'react-native'
import { Linking } from 'react-native';
import * as React from 'react';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeDataWithTimestamp } from '../../../service/storage';
import * as IntentLauncher from 'expo-intent-launcher';
const Home = () => {
    const [debugInfo, setDebugInfo] = useState(""); // Debug info storage
    const [debugVisible, setDebugVisible] = useState(true); // Control debug view visibility

    // const clearOnboarding = async () => {
    //     try {
    //         await AsyncStorage.removeItem('@viewedOnboarding')
    //     } catch (error) {
    //         console.log("Error: @clearOnboarding -> ", error)
    //     }
    // }

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
        setDebugInfo((prev) => `${prev}\n number is ${number}`)
        // const url = `https://api.whatsapp.com/send/?phone=%2B91${number}&text&type=phone_number&app_absent=0`

        // let supported = false;
        // try {
        //     supported = await Linking.canOpenURL(url);
        //     setDebugInfo((prev) => `${prev}\nCan Open URL: ${supported}`);
        // } catch (error) {
        //     console.error("Error checking URL support:", error);
        //     setDebugInfo((prev) => `${prev}\nError checking URL support: ${error.message}`);
        // }
        
        const phoneNumber = encodeURIComponent(`+91${number}`);
        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
        setDebugInfo((prev) => `${prev}\nGenerated URL: ${url}`);
    
        try {
            // Check if URL is supported
            const supported = await Linking.canOpenURL(url);
            setDebugInfo((prev) => `${prev}\nCan Open URL: ${supported}`);
            if (supported) {
                // Open the WhatsApp URL using Intent Launcher
                await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: url,
                    package: "com.whatsapp",
                    type: "text/plain",  // Optional: MIME type to help with URL handling
                });
                setDebugInfo((prev) => `${prev}\nWhatsApp opened`);
                console.log('WhatsApp opened successfully');
            } else {
                console.warn('WhatsApp cannot handle this URL');
                setDebugInfo((prev) => `${prev}\nWhatsApp cannot handle this URL`);
            }
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            setDebugInfo((prev) => `${prev}\nError: ${error.message}`);
        }

        setDebugInfo((prev) => `${prev}\nCan Open URL: `);
        // if (supported) {
        //     try {
        //         await storeDataWithTimestamp('@recent-chat-data', { number: number });
        //         setDebugInfo((prev) => `${prev}\nData saved successfully`);
        //         // Update UI or state after successful storage
        //     } catch (error) {
        //         console.error("Error storing data:", error);
        //         setDebugInfo((prev) => `${prev}\ndata didn't saved`);
        //     }
        //     try {
        //         await Linking.openURL(url);
        //         setDebugInfo((prev) => `${prev}\nWhatsApp opened successfully`);
        //     } catch (error) {
        //         console.error("Error opening WhatsApp:", error);
        //         setDebugInfo(`Error opening WhatsApp: ${error.message}`);
        //     }
        // } else {
        //     console.warn(`Can't handle URL: ${url}`);
        //     setDebugInfo((prev) => `${prev}\nCan't handle URL`);
        // }
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
            <Button icon="chat" buttonColor='#00a884' textColor='white' mode="elevated" color={isValid ? '#00a884' : '#aaa'} disabled={!isValid} onPress={handleChatNow}>
                Chat Now
            </Button>
             {/* Conditionally Render Debug View */}
             {debugVisible && (
                <View style={styles.debugContainer}>
                    <Text style={styles.debugText}>Debug Information:</Text>
                    <Text style={styles.debugText}>{debugInfo}</Text>
                </View>
            )}

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    debugContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "90%",
    },
    debugText: {
        fontSize: 12,
        color: "#444",
    },
});