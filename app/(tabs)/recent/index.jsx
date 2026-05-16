
import React from "react";

import { View } from "react-native";

import RecentList from "../../../components/RecentList";
import BackgroundSvg from "../../../components/BackgroundSvg";
import { useAppTheme } from "../../../constants/theme";

const Page = () => {
    const { colors } = useAppTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <BackgroundSvg />
            <RecentList />
        </View>
    );
};

export default Page;