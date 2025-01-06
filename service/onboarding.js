// to clear onboarding
export const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        } catch (error) {
            console.log("Error: @clearOnboarding -> ", error)
        }
    }