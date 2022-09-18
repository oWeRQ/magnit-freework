import { reactive } from 'vue';

export default function useConfirm() {
  let confirmResolve;

  const confirm = reactive({
    show: false,
    title: null,
    body: null,
    data: null,
  });

  function closeConfirm(result = false) {
    confirm.show = false;
    confirm.title = null;
    confirm.body = null;
    confirm.data = null;
    confirmResolve(result);
  }

  function showConfirm(title, body = null, data = null) {
    return new Promise(resolve => {
      confirmResolve = resolve;
      confirm.show = true;
      confirm.title = title,
      confirm.body = body,
      confirm.data = data;
    });
  }

  return {
    confirm,
    closeConfirm,
    showConfirm,
  };
}
