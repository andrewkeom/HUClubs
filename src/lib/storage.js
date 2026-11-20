import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadData(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) {
      return fallback;
    }
    const jsonValue = JSON.parse(value);
    return jsonValue;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function saveData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
