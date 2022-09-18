<template>
  <table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Дата</th>
        <th>Статус</th>
        <th width="64px"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in props.tasks" :key="task.id">
        <td>{{ task.name }}</td>
        <td>{{ formatDate(task.date) }}</td>
        <td>{{ formatStatus(task.status) }}</td>
        <td>
          <button @click="updateTask(task)"><img src="../assets/update-icon.svg" alt=""></button>
          <button @click="deleteTask(task)"><img src="../assets/delete-icon.svg" alt=""></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    tasks: Array,
  });

  const emit = defineEmits([
    'update:task',
    'delete:task',
  ]);

  function updateTask(task) {
    emit('update:task', task);
  }

  function deleteTask(task) {
    emit('delete:task', task);
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  function formatStatus(status) {
    return ({
      active: 'Активный',
      inactive: 'Не активный',
    })[status] || '-';
  }
</script>

<style scoped>
  table {
    width: 100%;
    margin: 39px 0;
    border-collapse: separate;
    border-spacing: 0 6px;
  }
  th {
    padding: 12px 44px;
    text-align: left;
  }
  td {
    padding: 25px 33px;
    background: #F6F6F6;
  }
  td:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  td:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  button + button {
    margin-left: 44px;
  }
</style>
