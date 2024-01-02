<template>
  <!-- 페이지네비게이션 시작 -->
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 페이지가 1보다 클때만 활성화 -->
      <li class="page-item" :class="isPrevPage">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('page', currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <!-- 클릭할때 마다 currentPage = page 를 할당하고
            watchEffect(fetchPosts); 를 선언하면 fetchPosts 내에서 사용하는 
            반응형 데이터가 변경되었기 때문에 watchEffect 가 이를 체크해서 
            다시 콜백 메서드를 실행한다.
            (page를 할당하고 이걸 다시 메소드를 호출하는 로직이 필요없게 됐다.)
          -->
        <a class="page-link" href="#" @click.prevent="$emit('page', page)">{{
          page
        }}</a>
      </li>
      <!-- 페이지가 끝에 다다르면 비활성화 -->
      <li class="page-item" :class="isNextPage">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('page', currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  <!-- 페이지네비게이션 끝 -->
</template>

<script setup>
import { computed } from 'vue';

// 1.부모페이지로 부터 Props 로 데이터를 넘겨 받는다.
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});
// 2.부모페이지로 올릴 Emits 이벤트 page 이벤트를 올려보자.
defineEmits(['page']);

const isPrevPage = computed(() => ({ disabled: !(props.currentPage > 1) }));
const isNextPage = computed(() => ({
  disabled: !(props.currentPage < props.pageCount),
}));
</script>

<style lang="scss" scoped></style>
