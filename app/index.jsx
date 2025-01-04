import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Onboarding from '../components/Onboarding';
import Home from './(tabs)/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
const Loading = () => {
  <View>
    <ActivityIndicator size="large" />
  </View>
}
export default function App() {
  const [loading, setLoading] = useState(true)
  const [viewOnboarding, setViewOnboarding] = useState(false)

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')

      if (value !== null) {
        setViewOnboarding(true)
      }
    } catch (error) {
      console.log("Error: @checkOnboarding -> ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    checkOnBoarding()
  },[])
  return (
    <View className="flex-1  items-center justify-center">
      {loading ? <Loading /> : viewOnboarding ? <Home /> : <Onboarding />

      }
    </View>
  );
}

