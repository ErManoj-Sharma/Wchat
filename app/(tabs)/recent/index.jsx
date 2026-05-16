
import React from "react";

import { View, useColorScheme } from "react-native";

import RecentList from "../../../components/RecentList";
import BackgroundSvg from "../../../components/BackgroundSvg";

const Page = () => {
    const isDark = useColorScheme() === "dark";

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: isDark ? "#0F172A" : "#F8FAFC",
            }}
        >
            <BackgroundSvg />
            <RecentList />
        </View>
    );
};

export default Page;