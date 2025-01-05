import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataWithTimestamp = async (key, newValue) => {
    try {
      const now = new Date();
      const timestamp = now.toISOString();
      const updatedValues = [newValue].map(item => ({ ...item, timestamp }));
  
      let existingData = await getDataWithTimestamp(key); 
  
      if (existingData) {
        // If data exists, combine existing and new arrays
        existingData = [...existingData, ...updatedValues]; 
      } else {
        // If no data exists, use the new values as the initial array
        existingData = updatedValues; 
      }
  
      const jsonValue = JSON.stringify(existingData);
      debugger
      await AsyncStorage.setItem(key, jsonValue); 
    } catch (e) {
      console.log('Failed to save the data to storage', e);
    }
  };

  export const getDataWithTimestamp = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : []; 
    } catch (e) {
      console.log('Failed to load data', e);
      return []; 
    }
  };