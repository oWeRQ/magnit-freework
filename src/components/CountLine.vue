<template>
  <div class="count-line" v-if="props.value">
    <span class="count-label">Выбрано объектов:</span>
    <span class="count-value">{{ props.value }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    value: {},
  });
</script>

<style scoped>
  .count-line {
    margin-top: 20px;
  }
  .count-label {
    margin-right: 4px;
    font-weight: bold;
  }
  .count-value {
    color: #106EDC;
  }
</style>
