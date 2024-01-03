/* 디렉티브를 플러그인으로 등록 */
import focus from '@/directives/focus';
import color from '@/directives/color';

export default {
  install(app) {
    // app.component() 전역 컴포넌트
    app.directive('focus', focus);
    app.directive('color', color);
  },
};
