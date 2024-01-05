import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
  // 리액티브 객체 반응형을 잃지 않게 storeToRefs 사용해서 추출
  const { alerts } = storeToRefs(useAlertStore());

  // 메소드는 반응형이 아니라서 괜찮음.
  const { vAlertMulti, vSuccess } = useAlertStore();

  return {
    alerts,
    vAlertMulti,
    vSuccess,
  };
}

/* 피니아 스토어 사용 전 버전.
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
*/
