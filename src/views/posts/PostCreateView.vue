<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();

// 1.변수선언
const form = ref({
  title: null,
  content: null,
});

// 2.생성
// ref form변수로 바인딩한 객체로 createPost 호출
const save = async () => {
  try {
    await createPost({
      ...form.value,
      careatedAt: Date.now(),
    });
    //저장 후 페이지 이동
    router.push({ name: 'PostList' });
  } catch (error) {
    console.error(error);
  }
};
const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
