import { ref, watch } from 'vue';

export default function useStorage(key, value) {
  const data = ref(value);

  loadFromStorage();

  watch(data, () => {
    saveToStorage();
  });

  function loadFromStorage() {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      data.value = JSON.parse(jsonValue);
    }
  }

  function saveToStorage() {
    const jsonValue = JSON.stringify(data.value);

    try {
      localStorage.setItem(key, jsonValue);
    } catch (e) {
      return false;
    }

    return true;
  }

  return data;
}
