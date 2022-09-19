import { defineStore } from 'pinia';
import { ref } from 'vue';
import useStorage from '../hooks/storage';

function usleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default defineStore('tasks', () => {
  const tasks = useStorage('tasks', [
    {
      id: 1,
      name: 'Task 1',
      body: 'Task Body 1',
      date: '2022-09-18T14:43:02.177Z',
      status: 'inactive',
    },
    {
      id: 2,
      name: 'Task 2',
      body: 'Task Body 2',
      date: '2022-09-18T14:43:02.177Z',
      status: 'active',
    },
  ]);
  const lastId = ref(tasks.value.reduce((a, c) => Math.max(a, c.id), 0));

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
      return task.id;
    } else {
      tasks.value = [
        ...tasks.value,
        {
          ...task,
          id: ++lastId.value,
        },
      ];
      return lastId.value;
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
