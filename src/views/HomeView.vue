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

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};

// app.provide() 등록되면 setup 함수에서 inject 로 주입할 수 있다.
const person = inject('person');
console.log('setup inject 호출 person.name', person.name);
</script>

<style lang="scss" scoped></style>
