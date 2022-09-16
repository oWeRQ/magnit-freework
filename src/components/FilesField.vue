<template>
  <div class="drop-area" @click="select()" @drop="drop($event)" @dragover="dragover($event)">
    <div class="drop-title">Загрузить файл</div>
    <div class="drop-hint">Выберите или перетащите один или несколько файлов</div>
  </div>
  <div class="group">
    <input type="text" :value="filesText" readonly placeholder="Выбрать файл...">
    <button class="btn btn-primary" @click="select()">Выбрать</button>
  </div>
  <input class="file-input" ref="fileInput" type="file" multiple @change="change($event)">
</template>

<script setup>
  import { defineEmits, ref } from 'vue';

  const emit = defineEmits([
    'select',
  ]);

  const fileInput = ref();
  const filesText = ref('');

  function select() {
    fileInput.value.click();
  }

  function changeFiles(files) {
    filesText.value = `Выбрано ${files.length} файла(ов).`
    emit('change', files);
  }

  function change($event) {
    changeFiles($event.target.files);
  }

  function drop($event) {
    $event.preventDefault();
    changeFiles($event.dataTransfer.files);
  }

  function dragover($event) {
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'copy';
  }
</script>

<style scoped>
  .drop-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    height: 200px;
    text-align: center;
    color: #82898F;
    background: #F6F6F6;
    border: 2px dashed #DFE3E7;
    border-radius: 6px;
  }
  .drop-title {
    margin: 3px 0;
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
  }
  .drop-hint {
    margin: 3px 0;
    line-height: 13px;
    font-size: 10px;
    font-weight: 500;
  }

  .file-input {
    display: none;
  }

  .group {
    display: flex;
  }
  .group > * + * {
    margin-left: 4px;
  }
</style>
