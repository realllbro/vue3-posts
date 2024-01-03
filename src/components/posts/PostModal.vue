<template>
  <!-- 커스텀 태그 v-model 로 구현  -->
  <AppModalCustom v-model="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목:</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">내용:</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3 text-muted">등록일:</div>
        <div class="col-9">{{ createAt }}</div>
      </div>
    </template>

    <template #actions>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        닫기
      </button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </template>
  </AppModalCustom>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: Boolean,
  title: String,
  content: String,
  createAt: [String, Number],
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
  // show 값을 읽어 갈때는 Getter가 호출되어 props에 modelValue를 읽어가게 하고
  get() {
    return props.modelValue;
  },
  // 수정이 일어 났을대는 emit 로 이벤트를 올리자.
  set(value) {
    emit('update:modelValue', value);
  },
});

const closeModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
