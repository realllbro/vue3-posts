/* 플러그인으로 등록 - 리팩토링 */
import AppAlertVue from '@/components/app/AppAlert.vue';
import AppAlertMulti from '@/components/app/AppAlertMulti.vue';
import AppCard from '@/components/app/AppCard.vue';
import AppGrid from '@/components/app/AppGrid.vue';
import AppModal from '@/components/app/AppModal.vue';
import AppModalCustom from '@/components/app/AppModalCustom.vue';
import AppPagination from '@/components/app/AppPagination.vue';

export default {
  install(app) {
    // app.component() 전역 컴포넌트
    app.component('AppAlertVue', AppAlertVue);
    app.component('AppAlertMulti', AppAlertMulti);
    app.component('AppCard', AppCard);
    app.component('AppGrid', AppGrid);
    app.component('AppModal', AppModal);
    app.component('AppModalCustom', AppModalCustom);
    app.component('AppPagination', AppPagination);
  },
};
