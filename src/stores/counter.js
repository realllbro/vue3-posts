// pinia 스토어 정의
import { defineStore } from 'pinia';

// 컴포저블 메서드 처럼 use접두어가 들어가는 관례이다.
// state, getters, actions 3가지 구조로 구성되어 있다.
export const useCounterStore = defineStore('counter', {
  // 컴포넌트 상태 역할
  state: () => ({
    counter: 1,
  }),

  // 컴포넌트 computed 역할
  getters: {
    doubleCount: state => state.counter * 2,

    // X
    // doubleCountPlusOne:

    // O
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },

  // 컴포넌트 method 역할
  actions: {
    increment() {
      this.counter++;
    },

    // 아래처럼 선언하면 스토어 인스턴스 this. 에 접근 못한다.
    // 화살표 함수 안에서 디스를 사용할 때는 상위 스코프의 this.에 영향을 받기 때문
    // getters 에 마찬가지
    // increment: () => this.counter++,
  },
});
