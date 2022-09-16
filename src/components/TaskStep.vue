<template>
  <fieldset @change="updateTask()">
    <div>
      <label>Название задания:</label>
      <input type="text" v-model="name">
    </div>
    <div>
      <label>Дата завершения:</label>
      <input type="date" v-model="date">
    </div>
    <div>
      <label>Описание задания:</label>
      <textarea v-model="body"></textarea>
    </div>
    <div>
      <label>Статус задания:</label>
      <select v-model="status">
        <option value="active">Активный</option>
        <option value="inactive">Не активный</option>
      </select>
    </div>
  </fieldset>
</template>

<script setup>
  import { defineProps, defineEmits, ref, computed } from 'vue';

  const props = defineProps({
    task: Object,
  });

  const emit = defineEmits([
    'update:task',
  ]);

  const name = ref(props.task.name || '');
  const date = ref(props.task.date || '');
  const body = ref(props.task.body || '');
  const status = ref(props.task.status || '');

  const task = computed(() => ({
    name: name.value,
    date: date.value,
    body: body.value,
    status: status.value,
  }));

  function updateTask() {
    emit('update:task', task.value);
  }
</script>
