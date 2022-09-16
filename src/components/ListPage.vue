<template>
  <button class="btn btn-primary" @click="createTask()">
    <img src="../assets/plus-white-icon.svg" alt="">
    Новое задание
  </button>
  <TasksTable
    :tasks="tasksStore.tasks"
    @update:task="updateTask($event)"
    @delete:task="deleteTask($event)"
  />
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import useTasksStore from '../store/tasks';
  import TasksTable from './TasksTable.vue';

  const router = useRouter();
  const tasksStore = useTasksStore();

  async function confirm(message) {
    return window.confirm(message);
  }

  function deleteConfirm(count = 1) {
    return confirm(`Удалить выбранное?\nВыбрано объектов ${count}`);
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
