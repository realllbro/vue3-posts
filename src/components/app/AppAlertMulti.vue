<template>
  <!--트랜지션 효과 적용 (내장 컴포넌트라 바로 사용할 수 있다.)-->
  <div class="app-alert">
    <TransitionGroup name="slide">
      <!-- 피니아 스토어로 리팩토링 하면서 주석처리
      <div
        v-for="({ message, type }, index) in items"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
       -->
      <div
        v-for="({ message, type }, index) in alerts"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useAlert } from '@/composables/alert';

/* 피니아 스토어로 리팩토링 하면서 주석처리 Props 사용안함
defineProps({
  items: Array,
});
*/

const { alerts } = useAlert();

const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
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
