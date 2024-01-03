<template>
  <!--트랜지션 효과 적용 (내장 컴포넌트라 바로 사용할 수 있다.)-->
  <Transition name="slide">
    <div v-if="show" class="app-alert alert" :class="typeClass" role="alert">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error',
    validator: value => ['success', 'error'].includes(value),
  },
});

const typeClass = computed(() =>
  props.type === 'error' ? 'alert-danger' : 'alert-primary',
);
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

/* 트랜지션 나타날 때, 사라질 때 효과 */
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px); /* 안보이는 위치로 숨겼다가 (내려오는 효과) */
}

.slide-enter-active,
.slide-leave-active {
  /* 트랜지션 해서 0.5.초간 효과를 주겠다. */
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px); /* 보이게 수정 */
}

/* 사라질 때 효과 */
</style>
