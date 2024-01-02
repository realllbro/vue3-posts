<template>
  <!-- show가 true 일 경우만 -->
  <div v-if="show">
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
                @click="$emit('close')"
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
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
});
defineEmits(['close']);
</script>

<style lang="scss" scoped></style>
