import { ref } from 'vue';

//반응형 배열로 멀티건 처리
const alerts = ref([]);

export function useAlert() {
  const vAlertMulti = (message, type = 'error') => {
    alerts.value.push({ message, type });
    setTimeout(() => {
      alerts.value.shift();
    }, 2000);
  };

  const vSuccess = message => vAlertMulti(message, 'success');
  return {
    alerts,
    vAlertMulti,
    vSuccess,
  };
}
