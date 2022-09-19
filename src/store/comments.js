import { defineStore } from 'pinia';
import { ref } from 'vue';
import useStorage from '../hooks/storage';

function usleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default defineStore('comments', () => {
  const comments = useStorage('comments', [
    {
      id: 1,
      taskId: 1,
      body: 'Comment 1',
      date: '2022-09-18T14:43:02.177Z',
    },
    {
      id: 2,
      taskId: 2,
      body: 'Comment 2',
      date: '2022-09-18T14:43:02.177Z',
    },
  ]);
  const lastId = ref(comments.value.reduce((a, c) => Math.max(a, c.id), 0));

  async function getCommentsByTaskId(taskId) {
    await usleep(500);
    return comments.value.filter(t => t.taskId == taskId);
  }

  async function saveComment(comment) {
    comments.value = [
      ...comments.value,
      {
        ...comment,
        id: ++lastId.value,
      },
    ];
  }

  async function deleteComment(comment) {
    comments.value = comments.value.filter(t => t.id !== comment.id);
  }

  return {
    getCommentsByTaskId,
    saveComment,
    deleteComment,
  };
});
