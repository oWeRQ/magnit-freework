<template>
  <div>
    <h1>
      {{ isNew ? 'Создание нового задания' : 'Редактирование задания' }}
    </h1>
    <ol>
      <li>Основные настройки</li>
      <li>Документы</li>
      <li>Комментарии</li>
    </ol>
    <div>
      <button v-if="hasPrevStep" @click="prev()">Назад</button>
      <button v-if="hasNextStep" @click="next()">Далее</button>
      <button @click="save()">Сохранить</button>
      <button @click="cancel()">Отмена</button>
    </div>
    <TaskStep v-if="step === 0" :task="task" @update:task="updateTask($event)" />
    <DocumentsStep v-if="step === 1" :task="task" @update:task="updateTask($event)" />
    <CommentsStep v-if="step === 2" :task="task" @update:task="updateTask($event)" />
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import useTasksStore from '../store/tasks';
  import TaskStep from './TaskStep.vue';
  import DocumentsStep from './DocumentsStep.vue';
  import CommentsStep from './CommentsStep.vue';

  const structuredClone = window.structuredClone;
  const router = useRouter();
  const route = useRoute();
  const tasksStore = useTasksStore();

  const defaultTask = {
    id: null,
    name: '',
    date: '',
    body: '',
    status: '',
  };
  const id = computed(() => route.params.id);
  const isNew = computed(() => !id.value);
  const task = ref(structuredClone(tasksStore.tasks.find(t => t.id == id.value) || defaultTask));

  const step = ref(0);
  const stepsCount = ref(3);
  const hasPrevStep = computed(() => step.value > 0)
  const hasNextStep = computed(() => step.value < stepsCount.value - 1)

  function prev() {
    if (hasPrevStep.value) {
      step.value--;
    }
  }

  function next() {
    if (hasNextStep.value) {
      step.value++;
    }
  }

  function save() {
    tasksStore.saveTask(task.value);
    cancel();
  }

  function cancel() {
    router.push({
      name: 'list',
    });
  }

  function updateTask(value) {
    task.value = {
      ...task.value,
      ...value,
    };
  }
</script>
