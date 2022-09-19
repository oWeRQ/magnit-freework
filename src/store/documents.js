import { defineStore } from 'pinia';
import { ref } from 'vue';
import useStorage from '../hooks/storage';

function usleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default defineStore('documents', () => {
  const documents = useStorage('documents', [
    {
      id: 1,
      taskId: 1,
      name: 'Document 1',
      url: 'data:text/plain,document 1',
    },
    {
      id: 2,
      taskId: 2,
      name: 'Document 2',
      url: 'data:text/plain,document 2',
    },
  ]);
  const lastId = ref(documents.value.reduce((a, c) => Math.max(a, c.id), 0));

  async function getDocumentsByTaskId(taskId) {
    await usleep(500);
    return documents.value.filter(t => t.taskId == taskId);
  }

  async function saveDocument(document) {
    documents.value = [
      ...documents.value,
      {
        ...document,
        id: ++lastId.value,
      },
    ];
  }

  async function deleteDocument(document) {
    documents.value = documents.value.filter(t => t.id !== document.id);
  }

  return {
    getDocumentsByTaskId,
    saveDocument,
    deleteDocument,
  };
});
