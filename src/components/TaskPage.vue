<template>
  <div>
    <h1>
      {{ isNew ? 'Создание нового задания' : 'Редактирование задания' }}
    </h1>
    <ol class="steps">
      <li
        v-for="(step, i) in steps"
        :key="i"
        :class="{ passed: i < stepIndex, active: i === stepIndex }"
      >{{ step.title }}</li>
    </ol>
    <div class="actions">
      <button class="btn" v-if="hasPrevStep" @click="prevStep()">
        <img src="../assets/left-gray-icon.svg" alt="">
        Назад
      </button>
      <button class="btn" v-if="hasNextStep" @click="nextStep()">
        <img src="../assets/right-gray-icon.svg" alt="">
        Далее
      </button>
      <div class="btn-separator"></div>
      <button class="btn btn-shadow" @click="saveTask()">
        <img src="../assets/done-icon.svg" alt="" />
        Сохранить
      </button>
      <button class="btn" @click="backToList()">
        <img src="../assets/cancel-icon.svg" alt="" />
        Отмена
      </button>
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

<style scoped>
  .steps {
    display: flex;
    margin: 24px 97px 30px 0;
    padding: 0;
    list-style: none;
    counter-reset: steps;
  }
  .steps > * {
    flex-grow: 1;
    flex-basis: 0;
    margin-right: 10px;
    padding: 18px 24px;
    font-size: 18px;
    font-weight: 500;
    background: #F2F6F9;
    border-top-left-radius: 10px;
  }
  .steps > .passed {
    color: #FFFFFF;
    background: #304E71;
  }
  .steps > .active {
    color: #FFFFFF;
    background: #0C2747;
  }
  .steps > ::before {
    content: counter(steps) '.';
    counter-increment: steps;
    margin-right: 4px;
  }

  .actions {
    display: flex;
    margin: 30px 77px 30px 0;
    padding: 21px 30px;
    background: #F6F6F6;
    border-top: 1px dashed rgb(130, 137, 143, .6);
    border-bottom: 1px dashed rgb(130, 137, 143, .6);
  }
</style>
