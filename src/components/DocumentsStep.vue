<template>
  <div class="row">
    <div class="upload-col">
      <FilesField @change="uploadDocuments($event)" />
    </div>
    <div class="list-col">
      <h2 class="list-title">Название</h2>
      <ul class="list">
        <li class="list-item" v-for="document in documents" :key="document.name">
          <div class="list-name">{{ document.name }}</div>
          <button @click="deleteDocument(document)">
            <img src="../assets/delete-icon.svg" alt="">
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import FilesField from './FilesField.vue';

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
</script>

<style scoped>
  .row {
    display: flex;
  }
  .upload-col {
    margin-right: 51px;
    width: 610px;
  }
  .list-col {
    width: 513px;
  }
  .list-title {
    margin: 12px 33px 18px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
  }
  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-item {
    display: flex;
    align-items: center;
    margin-top: 6px;
    padding: 20px 33px;
    background: #F6F6F6;
    border-radius: 6px;
  }
  .list-name {
    flex: 1;
  }
</style>
