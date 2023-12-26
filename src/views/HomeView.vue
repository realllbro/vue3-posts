<template>
  <div>
    <h2>Home View</h2>
    <!-- 현재 페이지 정보를 보려면 $route 내장객체를 사용하면 된다. -->
    <p>{{ $route }}</p>
    <button class="btn btn-primary" @click="goAboutPage">
      About 으로 이동
    </button>
  </div>
</template>

<script setup>
//스크립트에서 router 객체선언해서 push 함수 사용하기
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};
</script>

<style lang="scss" scoped></style>
