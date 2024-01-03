<template>
  <!-- show가 true 일 경우만 -->
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>

      <!-- Modal -->
      <div
        class="modal fade show d-block"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <!-- 헤더영역 슬롯 처리-->
              <slot name="header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  {{ title }}
                </h1>
                <!-- X 누를때 -->
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('udpate:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <!-- 바디영역 슬롯 처리 default -->
              <slot></slot>
            </div>
            <div class="modal-footer">
              <!-- 버튼영역 슬롯 처리-->
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
});
defineEmits(['close', 'udpate:modelValue']);
</script>

<style scoped>
/* 트랜지션 나타날 때, 사라질 때 효과 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  /* 트랜지션 해서 0.5.초간 효과를 주겠다. */
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

/* 사라질 때 효과 */
</style>
