import { ScrollView, Text, View, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getDataWithTimestamp } from '../service/storage';
import { storeDataWithTimestamp } from '../service/storage';
import * as IntentLauncher from 'expo-intent-launcher';

const RecentList = () => {
    const { width } = useWindowDimensions();
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataWithTimestamp('@recent-chat-data');
                setRecentChats(data);
            } catch (error) {
                console.error("Error fetching recent chats:", error);
            }
        };

        fetchData();
    }, [recentChats]);

    function formatISODate(isoString) {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    }
    const redirectToWhatsappChat = async(number) =>{
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
    return (
        <>
            {recentChats.length > 0 ? (
                <View className="bg-white">
                    <ScrollView className="bg-white">
                        {recentChats
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp (newest first)
                            .map((item, index) => (
                                <List.Item
                                    key={index}
                                    title={`+91-${item.number}`}
                                    description={formatISODate(item.timestamp)}
                                    left={props => <List.Icon {...props} icon="card-account-phone" />}
                                    onPress={() => redirectToWhatsappChat(item.number)} 
                                />
                            ))}
                    </ScrollView>
                </View>
            ) : (
                <View  className="bg-white flex-1 justify-center items-center" style={{ width }}>
                    <Image source={require("./../assets/images/no_data.png")} className=" flex-1 items-start justify-center" style={{ width, resizeMode: 'contain' }} />
                    <Text className="font-bold text-3xl mb-20 text-green text-center" > No Chat Records </Text>
                </View>
            )}
        </>
    );
};

export default RecentList;