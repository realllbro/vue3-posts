import axios from 'axios';
import { ref, unref, isRef, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// 전역변수 선언
const defaultConfig = {
  method: 'get',
};

const defaultOptions = {
  immediate: true,
};

// config = {} :초기화 빈 객체로 오면 {} 로 default 처리
export const useAxios = (url, config = {}, options = {}) => {
  console.log('============== useAxios 내부 실행');

  // 1.변수선언
  const response = ref(null);
  const data = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // 1-1.호출시 넘겨받는 파라메터 적재.
  const { params } = config;

  // 1-2.호출시 넘겨받는 콜백함수 및 옵션 등록.
  const { onSuccess, onError, immediate } = {
    ...defaultOptions,
    ...options,
  };

  // 2.execute 메서드
  const execute = body => {
    // 3.변수 초기화
    data.value = null;
    error.value = null;
    loading.value = true;

    // 4.파라메터 세팅 및 호출
    // axios(url, {   url이 반응형 데이터로 넘어오니 unref 해준다.
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      // watchEffect 함수가 파라메터로 함수를 받기 때문에 빈값일때 처리해준다.
      data: typeof body === 'object' ? body : {},
    })
      // 5.결과 데이터 추출
      .then(res => {
        response.value = res;
        data.value = res.data;
        // 5-1.onSuccess 함수가 있을때 실행
        if (onSuccess) {
          onSuccess(res);
        }
      })
      // 6.오류처리
      .catch(err => {
        error.value = err;
        // 6-1.onError 함수가 있을때 실행
        if (onError) {
          onError(err);
        }
      })
      // 7.finally
      .finally(() => {
        loading.value = false;
      });
  };

  console.log('immediate : ' + immediate);

  // params 변수 또는 url이 ref 함수이면 watchEffect 으로 모니터링 하고 아니면 execute() 로 한번실행
  if (isRef(params) || isRef(url)) {
    // watchEffect 으로 처리하면 execute 메소드 안에 반응형 데이터가
    // 변경되면 콜백함수가 다시 실행된다.
    // watchEffect는 watch와 다르게 초기에도 한번 실행된다.
    watchEffect(execute);
  } else {
    // 일반변수일때 이미디어트를 활용해 최초 페이지 로딩시 호출안되게 조건을 준다.
    if (immediate) {
      console.log('실행');
      execute();
    }
  }

  return {
    response,
    data,
    error,
    loading,
    execute,
  };
};
