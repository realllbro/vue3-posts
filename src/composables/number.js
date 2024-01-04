import { computed, unref, reactive, toRefs } from 'vue';

export const useNumber = number => {
  //number 가 반응형 객체로 넘어오니 unref 해준다.
  const isOdd = computed(() => unref(number) % 2 === 1);
  const isEven = computed(() => !isOdd.value);

  return {
    isOdd,
    isEven,
  };
};

export const useReactive = () => {
  const state = reactive({ x: 100, y: 1000 });

  // 이렇게 리턴하면 반응형이 풀린다.
  // return {
  //   state,
  // };

  //toRefs 싸주면 안풀린다.
  return toRefs(state);
};

//useReactive 호출예시
const { x, y } = useReactive();
