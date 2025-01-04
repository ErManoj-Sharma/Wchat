import { View, Text, Button, Touchable, TouchableOpacity ,BackHandler} from 'react-native'
import React,{useEffect} from 'react'
import { useRouter } from 'expo-router'
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
    return (
        <View>
            <Text>Home index page</Text>
            {/* <TouchableOpacity onPress={clearOnboarding}>
                <Text>Clear Onboarding</Text>
            </TouchableOpacity> */}
            <Button onPress={() => router.push("/bills/1")} title="go to first bill"></Button>
            <Button onPress={() => router.push("/bills/12122")} title="go to 2 bill"></Button>
            <Button onPress={() => router.replace("/home")} title="go to Home"></Button>
        </View>
    )
}

export default Home