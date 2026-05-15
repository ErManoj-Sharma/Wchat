
import React from "react";

import { View } from "react-native";

import RecentList from "../../../components/RecentList";

const Page = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor:
                    "#F8FAFC",
            }}
        >
            <RecentList />
        </View>
    );
};

export default Page;