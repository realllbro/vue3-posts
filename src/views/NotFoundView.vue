<template>
  <div class="text-center py-5">
    <h1>Oops!</h1>
    <h2>404 Not Found</h2>
    <div class="text-muted">요청한 페이지를 찾을 수 없습니다!</div>
    {{ $route.params.pathMatch }}
    <div class="mt-4">
      <!-- 라우터 링크를 버튼 태그로 하고 싶다면 이렇게 슬롯으로 
           넣으면 A태그 안에 버튼 태그가 들어가게 된다. -->
      <RouterLink to="/">
        <button class="btn btn-primary">HOME</button>
      </RouterLink>
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped></style>
