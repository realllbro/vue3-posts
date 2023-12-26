<template>
  <div>
    <h2>About View</h2>
    <!-- $router.push 메소드로 다른 페이지로 이동할 수 있다.  -->
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
  </div>
</template>

<script setup>
//javascript 에서 사용시 선언해서 사용.
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);
</script>

<style lang="scss" scoped></style>
