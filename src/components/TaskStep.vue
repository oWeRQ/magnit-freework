<template>
  <fieldset @change="updateTask()">
    <div class="row">
      <label class="field grow-2">
        <div class="label">Название задания:</div>
        <input type="text" v-model="name">
      </label>
      <label class="field">
        <div class="label">Дата завершения:</div>
        <input type="date" v-model="date">
      </label>
    </div>
    <div class="row">
      <label class="field">
        <div class="label">Описание задания:</div>
        <textarea v-model="body"></textarea>
      </label>
    </div>
    <div class="row-separator"></div>
    <div class="row">
      <label class="field">
        <div class="label">Статус задания:</div>
        <select v-model="status">
          <option value="active">Активный</option>
          <option value="inactive">Не активный</option>
        </select>
      </label>
      <div class="field grow-2"></div>
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

<style scoped>
  .label {
    margin-bottom: 4px;
  }
  .row {
    display: flex;
    margin-bottom: 29px;
    max-width: 920px;
  }
  .row-separator {
    margin: 30px 0 29px;
    max-width: 940px;
    border-bottom: 1px solid #DFE3E7;
  }
  .field {
    flex-grow: 1;
  }
  .grow-2 {
    flex-grow: 2;
  }
  .field + .field {
    margin-left: 20px;
  }
</style>
