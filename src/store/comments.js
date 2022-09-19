import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import indexedDB from './indexedDB';

const STORAGE_NAME = 'comments';

export default defineStore('comments', () => {
  async function getCommentsByTaskId(taskId) {
    const { getAll } = await indexedDB;
    return (await getAll(STORAGE_NAME)).filter(item => item.taskId == taskId);
  }

  async function saveComment(data) {
    const { add, put } = await indexedDB;
    if (data.id) {
      return await put(STORAGE_NAME, toRaw(data));
    } else {
      return await add(STORAGE_NAME, toRaw(data));
    }
  }

  async function deleteComment(data) {
    const { deleteKey } = await indexedDB;
    await deleteKey(STORAGE_NAME, data.id);
  }

  return {
    getCommentsByTaskId,
    saveComment,
    deleteComment,
  };
});
