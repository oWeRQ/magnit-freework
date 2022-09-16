<template>
  <fieldset>
    <div>
      <div v-for="comment in comments" :key="comment.date">
        {{ comment.body }}
        {{ comment.date }}
        <button @click="updateComment(comment)">Редактировать</button>
        <button @click="deleteComment(comment)">Удалить</button>
      </div>
    </div>

    <label>Комментарий к заданию:</label>
    <textarea v-model="body"></textarea>
    <button @click="createComment()">Добавить комментарий</button>
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

  const comments = ref(props.task.comments || []);
  const body = ref('');

  function updateTask() {
    emit('update:task', {
      comments: comments.value,
    });
  }

  function createComment() {
    comments.value.push({
      body: body.value,
      date: new Date().toString(),
    });
    updateTask();
  }

  function updateComment(comment) {
    console.log('updateComment', comment);
  }

  function deleteComment(comment) {
    comments.value = comments.value.filter(c => c !== comment);
    updateTask();
  }
</script>
