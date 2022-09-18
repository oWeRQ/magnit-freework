import { defineStore } from 'pinia';
import { ref } from 'vue';

function usleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default defineStore('comments', () => {
  const lastId = ref(2);
  const comments = ref([
    {
      id: 1,
      taskId: 1,
      body: 'Comment 1',
      date: new Date,
    },
    {
      id: 2,
      taskId: 2,
      body: 'Comment 2',
      date: new Date,
    },
  ]);

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
