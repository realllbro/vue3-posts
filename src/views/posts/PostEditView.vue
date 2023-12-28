<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <!-- 슬롯영역-->
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePosts } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// ref 변수선언
const form = ref({
  title: null,
  content: null,
});

// 1.조회
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    //form.value = { ...data };
    setForm(data);
  } catch (error) {
    console.error(error);
  }
};
// 2.v-model 맵핑 작업
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
fetchPost();

// 3.수정
const edit = async ({ title, content }) => {
  try {
    await updatePosts(id, { ...form.value });
    router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
  }
  form.value.title = title;
  form.value.content = content;
};

const goDetailPage = () =>
  router.push({ name: 'PostDetail', params: { id: id } });
</script>

<style lang="scss" scoped></style>
