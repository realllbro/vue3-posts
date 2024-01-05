<template>
  <div>
    <h2>About View</h2>
    <!-- $router.push 메소드로 다른 페이지로 이동할 수 있다.  -->
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
    <h2>Store</h2>
    <p>counter: {{ store.counter }}</p>
    <p>doubleCount: {{ store.doubleCount }}</p>
    <p>doubleCountPlusOne: {{ store.doubleCountPlusOne }}</p>
    <button @click="store.increment()">Click!!</button>

    <hr />
    <p>counter2: {{ counter }}</p>
    <p>doubleCount2: {{ doubleCount }}</p>
    <p>doubleCountPlusOne2: {{ doubleCountPlusOne }}</p>
    <button @click="increment">Click2!!</button>
  </div>
</template>

<script setup>
//javascript 에서 사용시 선언해서 사용.
import { useRoute } from 'vue-router';

// Pinia-1.Pinia store 사용
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

// Pinia-2.Pinia store 사용
const store = useCounterStore();

// Pinia-3.반응성 유지하면서 구조분해 할당하기. storeToRefs 사용.
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);

// Pinia-4.메서드는 바로 구조분해 할당 가능.
const { increment } = store;

// Pinia-5.메서드 바로 실행
increment();
increment();
increment();

// Pinia-6.pinia 에서는 state 바로 수정 가능하다.
// 기존 vuex 불가 vuex 에서는 mutation 이란 개념을 사용함.
counter.value = 100;
</script>

<style lang="scss" scoped></style>
