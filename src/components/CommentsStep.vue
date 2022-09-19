<template>
  <div class="row">
    <div class="chat" ref="chat">
      <div class="message" v-for="comment in comments" :key="comment.date">
        <div class="message-body">
          {{ comment.body }}
        </div>
        <div class="message-footer">
          <button @click="updateComment(comment)">
            <img height="16" src="../assets/update-icon.svg" alt="" />
          </button>
          <button @click="deleteComment(comment)">
            <img height="16" src="../assets/delete-icon.svg" alt="" />
          </button>
          <div class="message-date">
            {{ formatDate(comment.date) }}
          </div>
          <div class="message-time">
            {{ formatTime(comment.date) }}
          </div>
        </div>
      </div>
    </div>
    <div class="form">
      <label>
        <div class="label">Комментарий к заданию:</div>
        <textarea class="body" v-model="body"></textarea>
      </label>
      <div class="actions">
        <button class="btn btn-primary" @click="createComment()">Добавить комментарий</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    task: Object,
    comments: Array,
  });

  const emit = defineEmits([
    'update:comments',
  ]);

  const chat = ref();
  const comments = ref(props.comments || []);
  const body = ref('');

  function updateComments() {
    emit('update:comments', comments.value);
  }

  function createComment() {
    body.value = '';
    comments.value = [...comments.value, {
      body: body.value,
      date: new Date().toISOString(),
    }];
    updateComments();
    scrollChatToBottom();
  }

  function updateComment(comment) {
    console.log('updateComment', comment);
    alert('Поведение не описано');
  }

  function deleteComment(comment) {
    comments.value = comments.value.filter(c => c !== comment);
    updateComments();
  }

  function scrollChatToBottom() {
    chat.value.scrollTop = chat.value.scrollMaxTop;
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  function formatTime(date) {
    return new Date(date).toLocaleTimeString();
  }
</script>

<style scoped>
  .row {
    display: flex;
  }
  .chat {
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    margin-right: 31px;
    padding: 30px;
    width: 780px;
    min-height: 438px;
    background: #F2F6F9;
    border-radius: 6px;
  }
  .message {
    margin-top: 20px;
    padding: 12px;
    min-width: 300px;
    max-width: calc(100% - 30px);
    background: #FFFFFF;
    border: 1px solid #DFE3E7;
    border-radius: 6px;
  }
  .message-body {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .message-footer {
    display: flex;
    align-items: center;
    margin: 16px 0 -4px;
  }
  .message-footer > * + * {
    margin-left: 20px;
  }
  .message-date,
  .message-time {
    font-size: 10px;
    color: #82898F;
  }
  .message-date {
    margin-left: auto;
  }

  .form {
    width: 354px;
  }

  .label {
    margin-bottom: 4px;
  }
  .body {
    height: 350px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 10px;
  }
</style>
