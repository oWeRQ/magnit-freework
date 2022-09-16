<template>
  <div>
    <h1>
      {{ isNew ? 'Создание нового задания' : 'Редактирование задания' }}
    </h1>
    <ol>
      <li v-for="(step, i) in steps" :key="i">{{ step.title }}</li>
    </ol>
    <div>
      <button v-if="hasPrevStep" @click="prevStep()">Назад</button>
      <button v-if="hasNextStep" @click="nextStep()">Далее</button>
      <button @click="saveTask()">Сохранить</button>
      <button @click="backToList()">Отмена</button>
    </div>
    <component :is="activeStep.component" :task="task" @update:task="updateTask($event)" />
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
    documents: [],
    comments: [],
  };
  const id = computed(() => route.params.id);
  const isNew = computed(() => !id.value);
  const task = ref(structuredClone(tasksStore.tasks.find(t => t.id == id.value) || defaultTask));

  const steps = [
    {
      title: 'Основные настройки',
      component: TaskStep,
    },
    {
      title: 'Документы',
      component: DocumentsStep,
    },
    {
      title: 'Комментарии',
      component: CommentsStep,
    },
  ];
  const stepIndex = ref(0);
  const activeStep = computed(() => steps[stepIndex.value]);
  const hasPrevStep = computed(() => stepIndex.value > 0)
  const hasNextStep = computed(() => stepIndex.value < steps.length - 1)

  function prevStep() {
    if (hasPrevStep.value) {
      stepIndex.value--;
    }
  }

  function nextStep() {
    if (hasNextStep.value) {
      stepIndex.value++;
    }
  }

  function saveTask() {
    tasksStore.saveTask(task.value);
    backToList();
  }

  function backToList() {
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
