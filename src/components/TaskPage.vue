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
        @click="changeStep(i)"
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
      <button class="btn" @click="cancelTask()">
        <img src="../assets/cancel-icon.svg" alt="" />
        Отмена
      </button>
    </div>
    <component
      v-if="!isLoaded"
      :is="activeStep.component"
      :task="task"
      :documents="documents"
      :comments="comments"
      @update:task="updateTask($event)"
      @update:documents="updateDocuments($event)"
      @update:comments="updateComments($event)"
    />
    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import useTasksStore from '../store/tasks';
  import useDocumentsStore from '../store/documents';
  import useCommentsStore from '../store/comments';
  import TaskStep from './TaskStep.vue';
  import DocumentsStep from './DocumentsStep.vue';
  import CommentsStep from './CommentsStep.vue';

  const structuredClone = window.structuredClone;
  const router = useRouter();
  const route = useRoute();
  const tasksStore = useTasksStore();
  const documentsStore = useDocumentsStore();
  const commentsStore = useCommentsStore();

  const defaultTask = {
    id: null,
    name: '',
    date: '',
    body: '',
    status: 'inactive',
    documents: [],
    comments: [],
  };
  const task = ref();
  const documents = ref();
  const comments = ref();
  const id = computed(() => route.params.id);
  const isNew = computed(() => !id.value);
  const isLoaded = computed(() => !task.value);

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
  const hasPrevStep = computed(() => stepIndex.value > 0);
  const hasNextStep = computed(() => stepIndex.value < steps.length - 1);

  watch(id, () => {
    fetchTask();
    fetchDocuments();
    fetchComments();
  });

  onMounted(() => {
    fetchTask();
    fetchDocuments();
    fetchComments();
  });

  async function fetchTask() {
    task.value = structuredClone(id.value && await tasksStore.getTaskById(id.value) || defaultTask);
  }

  async function fetchDocuments() {
    documents.value = structuredClone(id.value && await documentsStore.getDocumentsByTaskId(id.value) || []);
  }

  async function fetchComments() {
    comments.value = structuredClone(id.value && await commentsStore.getCommentsByTaskId(id.value) || []);
  }

  async function cancelConfirm() {
    return confirm('Отменить?');
  }

  function canChangeStep(i) {
    if (i < 0 || i >= steps.length)
      return false;

    if (!isNew.value)
      return true;

    if (task.value.name && task.value.date)
      return true;

    return false;
  }

  function changeStep(i) {
    if (canChangeStep(i)) {
      stepIndex.value = i;
    }
  }

  function prevStep() {
    changeStep(stepIndex.value - 1);
  }

  function nextStep() {
    changeStep(stepIndex.value + 1);
  }

  async function saveTask() {
    const taskId = task.value.id;

    await Promise.all([
      tasksStore.saveTask(task.value),
      ...documents.value.filter(d => !d.id).map(document => {
        return documentsStore.saveDocument({ ...document, taskId });
      }),
      ...comments.value.filter(c => !c.id).map(comment => {
        return commentsStore.saveComment({ ...comment, taskId });
      }),
    ]);

    backToList();
  }

  async function cancelTask() {
    if (await cancelConfirm()) {
      backToList();
    }
  }

  function backToList() {
    router.push({
      name: 'list',
    });
  }

  function updateTask(values) {
    task.value = {
      ...task.value,
      ...values,
    };
  }

  function updateDocuments(documents) {
    task.value = {
      ...task.value,
      documents,
    };
  }

  function updateComments(comments) {
    task.value = {
      ...task.value,
      comments,
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
    cursor: pointer;
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
