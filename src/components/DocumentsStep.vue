<template>
  <fieldset>
    <div>
      <div @drop="drop($event)" @dragover="dragover($event)">
        Загрузить файл
        Выберите или перетащите один или несколько файлов
      </div>
      <input type="file" multiple @change="uploadDocuments($event.target.files)">
    </div>
    <div>
      <h2>Название</h2>
      <ul>
        <li v-for="document in documents" :key="document.name">
          {{ document.name }}
          <button @click="deleteDocument(document)">Удалить</button>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    task: Object,
  });

  const emit = defineEmits([
    'update:task',
  ]);

  const documents = ref(props.task.documents || []);

  function updateTask() {
    emit('update:task', {
      documents: documents.value,
    });
  }

  function uploadDocuments(files) {
    for (const file of files) {
      documents.value.push(file);
    }
    updateTask();
  }

  function deleteDocument(document) {
    documents.value = documents.value.filter(d => d !== document);
  }

  function drop($event) {
    $event.preventDefault();
    uploadDocuments($event.dataTransfer.files);
  }

  function dragover($event) {
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'copy';
  }
</script>
