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

  <Modal :show="confirm.show" @close="closeConfirm($event)">
    <template #title>{{ confirm.title }}</template>
    <div>
      {{ confirm.body }}
      <CountLine :value="confirm.data" />
    </div>
    <template #actions="{ close }">
      <button class="btn" @click="close(false)">Отмена</button>
      <button class="btn btn-primary" @click="close(true)">Удалить</button>
    </template>
  </Modal>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import useTasksStore from '../store/tasks';
  import useConfirm from '../hooks/confirm';
  import TasksTable from './TasksTable.vue';
  import Modal from './Modal.vue';
  import CountLine from './CountLine.vue';

  const { confirm, closeConfirm, showConfirm } = useConfirm();
  const router = useRouter();
  const tasksStore = useTasksStore();
  const tasks = ref();

  onMounted(() => {
    fetchTasks();
  });

  async function fetchTasks() {
    tasks.value = await tasksStore.getTasks();
  }

  async function deleteTask(task) {
    if (await showConfirm('Удалить выбранное?', 'Выбранные вами объекты удалятся без возможности восстановления.', 1)) {
      await tasksStore.deleteTask(task);
      await fetchTasks();
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
