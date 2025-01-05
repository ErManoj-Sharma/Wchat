import { ScrollView, Text, View, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { getDataWithTimestamp } from '../service/storage';

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
    return (
        <View className="bg-white">
            {recentChats.length > 0 ? (
                <View className="bg-white">
                    <ScrollView  className="bg-white">
                        {recentChats.map((item, index) => (
                            <List.Item  
                                key={index}
                                title={`+91-${item.number}`}
                                description={formatISODate(item.timestamp)}
                                left={props => <List.Icon {...props} icon="card-account-phone" />}
                            />
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <View  className="bg-whiteflex justify-center items-center" style={{ width }}>
                    <Image source={require("./../assets/images/no_data.png")} className="flex items-center justify-center" style={{ width, resizeMode: 'contain' }} />
                    <Text className="font-bold text-3xl mb-2.5 text-green text-center" > No Chat Records </Text>
                </View>
            )}
        </View>
    );
};

export default RecentList;