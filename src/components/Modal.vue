<template>
  <div v-if="props.show" @click.self="close()" class="overlay">
    <div class="dialog">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="actions">
        <slot name="actions" :close="close" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    show: Boolean,
  });

  const emit = defineEmits([
    'close',
  ]);

  function close(value) {
    emit('close', value);
  }
</script>

<style scoped>
  .overlay {
    overflow: auto;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: safe center;
    justify-content: safe center;
    background: rgb(112, 116, 120, .4);
  }
  .dialog {
    box-sizing: border-box;
    margin: 40px;
    padding: 40px 40px 60px;
    max-width: 490px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }
  .body {
    line-height: 1.4;
  }
  .actions {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }
</style>
