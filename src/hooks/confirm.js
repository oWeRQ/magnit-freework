import { reactive } from 'vue';

export default function useConfirm() {
  let confirmResolve;

  const confirm = reactive({
    show: false,
    title: null,
    body: null,
    count: null,
  });

  function closeConfirm(result = false) {
    confirm.show = false;
    confirm.title = null;
    confirm.body = null;
    confirm.count = null;
    confirmResolve(result);
  }

  function deleteConfirm(count = 1) {
    return new Promise(resolve => {
      confirmResolve = resolve;
      confirm.show = true;
      confirm.title = 'Удалить выбранное?',
      confirm.body = 'Выбранные вами объекты удалятся без возможности восстановления.',
      confirm.count = count;
    });
  }

  return {
    confirm,
    closeConfirm,
    deleteConfirm,
  };
}
