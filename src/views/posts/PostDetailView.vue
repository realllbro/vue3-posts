<template>
  <div>
    <h2>제목</h2>
    <p>내용</p>
    <p class="text-muted">2020-01-01</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>

    <p>params : {{ $route.params }}</p>

    <!-- url에 ? 이후 쿼리스트링 -->
    <p>query : {{ $route.query }}</p>

    <!-- url에 #이 있으면 hash 객체에 담긴다.-->
    <p>hash : {{ $route.hash }}</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push({ name: 'PostEdit', params: { id: id } });
</script>

<style lang="scss" scoped></style>
