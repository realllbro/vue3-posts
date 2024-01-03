// 1.dayjs 사용하기 위해 라이브러리 import
import dayjs from 'dayjs';

export default {
  install(app) {
    // 2.컴포넌트에서 변수로 사용하기 위해 등록
    app.config.globalProperties.$dayjs = dayjs;

    // 3.setup 함수에서 사용하기 위해 provider 등록
    app.provide('dayjs', dayjs);
  },
};
