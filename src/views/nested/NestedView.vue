<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <!-- Router replace 속성은 이력큐에 쌓이지 않고 이전 페이지와 교체된다. -->
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedOne', replace: true }"
          >Nested One</RouterLink
        >
      </li>
      <li class="nav-item">
        <!-- Router replace 속성은 이력큐에 쌓이지 않고 이전 페이지와 교체된다. -->
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedTwo', replace: true }"
          >Nested Two</RouterLink
        >
      </li>
    </ul>
    <hr class="my-4" />
    <!-- 중첩된 view 사용을 위한 라우터적용 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
