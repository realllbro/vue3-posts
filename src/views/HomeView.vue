<template>
  <div>
    <h2>Home View</h2>
    <!-- 현재 페이지 정보를 보려면 $route 내장객체를 사용하면 된다. -->
    <p>{{ $route }}</p>
    <button class="btn btn-primary" @click="goAboutPage">
      About 으로 이동
    </button>
    <hr class="my-4" />
    <!-- 전역 변수로 등록된 person 은 템플릿에서는 아래처럼 접근가능하다.-->
    <h2>{{ $person.name }}</h2>
    <button class="btn btn-primary" @click="person.say">click person</button>
    <h2>position : {{ position }}</h2>
    <h2>x : {{ x }}, y:{{ y }}</h2>
    <h2>x1 : {{ x1 }}, y1:{{ y1 }}</h2>
    <h2>x2 : {{ x2 }}, y2:{{ y2 }}</h2>
    <h2>x3 : {{ x3 }}, y3:{{ y3 }}</h2>
  </div>
</template>

<!--전역 변수로 등록된 person 컴포넌트 인스턴스는 
    Setup Lifecycle 이후에 생성이 되기 때문에 
    Setup Lifecycle Hook에서 사용할 수는 없다.
    Options API에서 사용하면 된다.-->
<script>
export default {
  created() {
    console.log('Options Api 호출: ', this.$person.name);
    this.$person.say();
  },
};
</script>

<script setup>
//스크립트에서 router 객체선언해서 push 함수 사용하기
import { useRouter } from 'vue-router';

import { inject } from 'vue';
import { reactive } from 'vue';
import { ref, toRef, toRefs } from 'vue';

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};

// app.provide() 등록되면 setup 함수에서 inject 로 주입할 수 있다.
const person = inject('person');
console.log('setup inject 호출 person.name', person.name);

// =====================================================

// toRef 예제. reactive 객체의 속성만 추출하기.
const position = reactive({ x: 100, y: 1000 });

// 1. 그냥 추출해서 사용시 일반 데이터 타입(number) 이다.
const { x, y } = position;
console.log('x: ', typeof x);
console.log('y: ', typeof y);

// 2. ref 로 추출해도 초기값만 할당되고 별개로 움직일뿐 동기화 되지 않는다.
const x1 = ref(position.x);
const y1 = ref(position.y);
console.log('x1: ', typeof x1.value);
console.log('y1: ', typeof y1.value);

// 3. toRef 로 하나씩 추출( toRef 로 인해 양방향 동기화).
const x2 = toRef(position, 'x');
const y2 = toRef(position, 'y');
console.log('x2: ', typeof x2.value);
console.log('y2: ', typeof y2.value);

// 4. toRefs 로 여러건 구조분해 해서 추출( toRefs 로 인해 양방향 동기화).
const { x: x3, y: y3 } = toRefs(position);
console.log('x3: ', typeof x3.value);
console.log('y3: ', typeof y3.value);
</script>

<style lang="scss" scoped></style>
