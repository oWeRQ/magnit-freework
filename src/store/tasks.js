import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import indexedDB from './indexedDB';

const STORAGE_NAME = 'tasks';

export default defineStore('tasks', () => {
  async function getTasks() {
    const { getAll } = await indexedDB;
    return await getAll(STORAGE_NAME);
  }

  async function getTaskById(id) {
    const { get } = await indexedDB;
    return await get(STORAGE_NAME, +id);
  }

  async function saveTask(data) {
    const { add, put } = await indexedDB;
    if (data.id) {
      return await put(STORAGE_NAME, toRaw(data));
    } else {
      return await add(STORAGE_NAME, toRaw(data));
    }
  }

  async function deleteTask(data) {
    const { deleteKey } = await indexedDB;
    await deleteKey(STORAGE_NAME, data.id);
  }

  return {
    getTasks,
    getTaskById,
    saveTask,
    deleteTask,
  };
});
