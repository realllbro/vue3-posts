<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <!-- slot 영역 -->
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>

        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
    <!-- App.vue 레이어로 위치 옮김 
      <AppAlertMulti :items="alerts" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

// App.vue 레이어로 위치 옮김
// const { alerts, vAlertMulti, vSuccess } = useAlert();
const { vAlertMulti, vSuccess } = useAlert();

const router = useRouter();
const loading = ref(false);
const error = ref(null);

// 1.변수선언
const form = ref({
  title: null,
  content: null,
});

// 2.생성
// ref form변수로 바인딩한 객체로 createPost 호출
const save = async () => {
  try {
    // 0.progress 상태 처리
    loading.value = true;

    // 1.저장
    await createPost({
      ...form.value,
      careatedAt: Date.now(),
    });
    //저장 후 페이지 이동
    vSuccess('등록이 완료되었습니다.');
    router.push({ name: 'PostList' });
  } catch (err) {
    error.value = err;
    vAlertMulti(err.message);
  } finally {
    // 2.progress 상태 처리
    loading.value = false;
  }
};
const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
