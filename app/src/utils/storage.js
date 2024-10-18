import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

export const storeData = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);

};

export const getStoredString = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value
};

export const getStoredData = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeStoredData = async (key) => {
    await AsyncStorage.removeItem(key)
}