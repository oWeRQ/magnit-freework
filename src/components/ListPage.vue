<template>
  <button class="btn btn-primary" @click="createTask()">
    <img src="../assets/plus-white-icon.svg" alt="">
    Новое задание
  </button>
  <TasksTable
    v-if="tasks"
    :tasks="tasks"
    @update:task="updateTask($event)"
    @delete:task="deleteTask($event)"
  />
  <p v-else>Загрузка...</p>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import useTasksStore from '../store/tasks';
  import TasksTable from './TasksTable.vue';

  const router = useRouter();
  const tasksStore = useTasksStore();

  const tasks = ref();

  onMounted(() => {
    fetchTasks();
  });

  async function deleteConfirm(count = 1) {
    return window.confirm(`Удалить выбранное?\nВыбрано объектов ${count}`);
  }

  async function fetchTasks() {
    tasks.value = await tasksStore.getTasks();
  }

  async function deleteTask(task) {
    if (await deleteConfirm()) {
      console.log('delete', task);
      tasksStore.deleteTask(task);
    }
  }

  function updateTask(task) {
    router.push({
      name: 'task',
      params: {
        id: task.id,
      },
    });
  }

  function createTask() {
    router.push({
      name: 'task',
    });
  }
</script>
