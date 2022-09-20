import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import store from './indexedDB';

const storage = store('documents');

export default defineStore('documents', () => {
  async function getDocumentsByTaskId(taskId) {
    return storage.getAllFromIndex('taskId', +taskId);
  }

  async function saveDocument(data) {
    if (data.id) {
      return storage.put(toRaw(data));
    } else {
      return storage.add(toRaw(data));
    }
  }

  async function deleteDocument(data) {
    return storage.del(data.id);
  }

  return {
    getDocumentsByTaskId,
    saveDocument,
    deleteDocument,
  };
});
