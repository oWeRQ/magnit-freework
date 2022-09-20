import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import store from './indexedDB';

const storage = store('tasks');

export default defineStore('tasks', () => {
  async function getTasks() {
    return storage.getAll();
  }

  async function getTaskById(id) {
    return storage.get(+id);
  }

  async function saveTask(data) {
    if (data.id) {
      return storage.put(toRaw(data));
    } else {
      return storage.add(toRaw(data));
    }
  }

  async function deleteTask(data) {
    return storage.del(data.id);
  }

  return {
    getTasks,
    getTaskById,
    saveTask,
    deleteTask,
  };
});
