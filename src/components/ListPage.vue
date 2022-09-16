<template>
  <div>
    <button @click="createTask()">Новое задание</button>
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Дата</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasksStore.tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.date }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button @click="updateTask(task)">Редактировать</button>
            <button @click="deleteTask(task)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import useTasksStore from '../store/tasks';

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
