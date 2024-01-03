// components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // 사용자 정의 글로벌 컴포넌트는 정의를 해줘야 포멧 식별이 가능하다.
    AppAlert: typeof import('./src/components/app/AppAlert.vue')['default'];
    AppAlertMulti: typeof import('./src/components/app/AppAlertMulti.vue')['default'];
    AppCard: typeof import('./src/components/app/AppCard.vue')['default'];
    AppGrid: typeof import('./src/components/app/AppGrid.vue')['default'];
    AppModal: typeof import('./src/components/app/AppModal.vue')['default'];
    AppModalCustom: typeof import('./src/components/app/AppModalCustom.vue')['default'];
    AppPagination: typeof import('./src/components/app/AppPagination.vue')['default'];
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
  }
}

export {};