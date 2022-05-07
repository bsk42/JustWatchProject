import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLoggedInUser() {
    return JSON.parse(await AsyncStorage.getItem('currentUser'));
  }
  
export async function setLoggedInUser(user) {
    await AsyncStorage.setItem('currentUser', user);
  }
  
  