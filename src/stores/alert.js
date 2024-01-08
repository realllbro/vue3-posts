import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  //리액티브 객체라서 .value 아님.
  state: () => ({
    alerts: [],
  }),
  actions: {
    vAlertMulti(message, type = 'error') {
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.alerts.shift();
      }, 2000);
    },

    // 본인 인스턴스에 접근하기 위해 this 객체 사용 (화살표 함수사용X)
    vSuccess(message) {
      this.vAlertMulti(message, 'success');
    },
  },
});
