import { defineStore } from 'pinia';
import { ref } from 'vue';

function usleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default defineStore('tasks', () => {
  const lastId = ref(2);
  const tasks = ref([
    {
      id: 1,
      name: 'Task 1',
      body: 'Task Body 1',
      date: new Date(),
      status: 'inactive',
      documents: [],
      comments: [],
    },
    {
      id: 2,
      name: 'Task 2',
      body: 'Task Body 2',
      date: new Date(),
      status: 'active',
      documents: [],
      comments: [],
    },
  ]);

  async function getTasks() {
    await usleep(500);
    return tasks.value;
  }

  async function getTaskById(id) {
    await usleep(500);
    return tasks.value.find(t => t.id == id);
  }

  async function saveTask(task) {
    if (task.id) {
      tasks.value = tasks.value.map(t => t.id == task.id ? task : t);
    } else {
      tasks.value = [
        ...tasks.value,
        {
          ...task,
          id: ++lastId.value,
        },
      ];
    }
  }

  async function deleteTask(task) {
    tasks.value = tasks.value.filter(t => t.id !== task.id);
  }

  return {
    getTasks,
    getTaskById,
    saveTask,
    deleteTask,
  };
});
