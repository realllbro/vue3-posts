<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="edit">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          id="title"
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          v-model="form.content"
          class="form-control"
          id="content"
          rows="3"
        ></textarea>
      </div>
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePosts } from '@/api/posts';

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
