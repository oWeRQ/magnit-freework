import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import store from './indexedDB';

const storage = store('comments');

export default defineStore('comments', () => {
  async function getCommentsByTaskId(taskId) {
    return storage.getAllFromIndex('taskId', +taskId);
  }

  async function saveComment(data) {
    if (data.id) {
      return storage.put(toRaw(data));
    } else {
      return storage.add(toRaw(data));
    }
  }

  async function deleteComment(data) {
    return storage.del(data.id);
  }

  return {
    getCommentsByTaskId,
    saveComment,
    deleteComment,
  };
});
