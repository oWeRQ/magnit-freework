import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import indexedDB from './indexedDB';

export default defineStore('tasks', () => {
  async function getTasks() {
    const { getAll } = await indexedDB;
    return await getAll('tasks');
  }

  async function getTaskById(id) {
    const { get } = await indexedDB;
    return await get('tasks', +id);
  }

  async function saveTask(task) {
    const { add, put } = await indexedDB;
    if (task.id) {
      return await put('tasks', toRaw(task));
    } else {
      return await add('tasks', toRaw(task));
    }
  }

  async function deleteTask(task) {
    const { deleteKey } = await indexedDB;
    await deleteKey('tasks', task.id);
  }

  return {
    getTasks,
    getTaskById,
    saveTask,
    deleteTask,
  };
});
