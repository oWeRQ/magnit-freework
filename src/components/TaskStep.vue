<template>
  <fieldset @change="updateTask()">
    <div class="row">
      <label class="field grow-2">
        <div class="label">Название задания:</div>
        <input type="text" v-model="name">
      </label>
      <label class="field">
        <div class="label">Дата завершения:</div>
        <input type="date" :valueAsDate="new Date(date)" @change="date = $event.target.valueAsDate.toISOString()">
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
  import { defineProps, defineEmits, ref, computed, watch, onMounted } from 'vue';

  const props = defineProps({
    task: Object,
  });

  const emit = defineEmits([
    'update:task',
  ]);

  const name = ref('');
  const date = ref('');
  const body = ref('');
  const status = ref('');

  watch(() => props.task, () => {
    updateRefs();
  });

  onMounted(() => {
    updateRefs();
  });

  const task = computed(() => ({
    name: name.value,
    date: date.value,
    body: body.value,
    status: status.value,
  }));

  function updateRefs() {
    name.value = props.task.name || '';
    date.value = props.task.date || '';
    body.value = props.task.body || '';
    status.value = props.task.status || '';
  }

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
    flex: 1 0 0;
  }
  .grow-2 {
    flex-grow: 2;
  }
  .field + .field {
    margin-left: 20px;
  }
</style>
