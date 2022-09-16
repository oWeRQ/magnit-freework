import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('tasks', () => {
  const tasks = ref([
    { id: 1, name: 'Task 1', date: new Date(), status: 'inactive' },
    { id: 2, name: 'Task 2', date: new Date(), status: 'active' },
  ]);

  function deleteTask(task) {
    console.log(tasks.value);
    tasks.value = tasks.value.filter(t => t.id !== task.id);
  }

  return {
    tasks,
    deleteTask,
  };
});
