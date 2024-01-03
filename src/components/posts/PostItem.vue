<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdAt }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <!-- 카드 페이지에 걸려 있는 상세보기 링크 
          더블링 방지를 위해 stop 옵션 사용  -->
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-card-text"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
//setup 함수에서 Props를 선언할 때는 defineProps라는 메크로 함수를 사용한다.
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});

defineEmits(['modal']);
</script>

<style lang="scss" scoped></style>
