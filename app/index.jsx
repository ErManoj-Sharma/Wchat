import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Onboarding from '../components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
const Loading = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(false);

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewOnboarding(true);
      }
    } catch (error) {
      console.log('Error: @checkOnboarding -> ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnBoarding();
  }, []);

  // Navigate after state updates
  useEffect(() => {
    if (!loading && viewOnboarding) {
      router.push('/home');
    }
  }, [loading, viewOnboarding]);

  return (
    <View className="flex-1 items-center justify-center">
      {loading ? <Loading /> : !viewOnboarding && <Onboarding />}
      <StatusBar style="auto" />
    </View>
  );
}
