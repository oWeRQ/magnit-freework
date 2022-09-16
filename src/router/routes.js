import ListPage from '../components/ListPage.vue';
import TaskPage from '../components/TaskPage.vue';

export default [
  { path: '/', component: ListPage, name: 'list' },
  { path: '/task/:id?', component: TaskPage, name: 'task' },
];
