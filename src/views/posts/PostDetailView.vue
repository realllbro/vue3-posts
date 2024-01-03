<template>
  <!-- 1.progress -->
  <AppLoading v-if="loading" />

  <!-- 2.오류시 메시지 처리  -->
  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      <!-- 전역변수로 선언한 $dayjs 플러그인 템플릿에서 사용방법 -->
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="'11111'" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>

    <br /><br /><br />
    <h1>route 정보</h1>
    <hr />

    <p>params : {{ $route.params }}</p>

    <!-- url에 ? 이후 쿼리스트링 -->
    <p>query : {{ $route.query }}</p>

    <!-- url에 #이 있으면 hash 객체에 담긴다.-->
    <p>hash : {{ $route.hash }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, deletePosts } from '@/api/posts';

const router = useRouter();
const route = useRoute();

//get 으로 받은 파라메터 사용해서 조회.
//const id = route.params.id;

// props 속성으로 받기
const props = defineProps({
  id: [String, Number],
});

/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content
 * 장) 일관성
 *
 * reactvie
 * 단) 객체 할당 불가능
 * 장) form.title, form.content
 */

// ref 변수선언
const post = ref({
  title: null,
  content: null,
  createdAt: null,
});

const error = ref(null);
const loading = ref(false);

// 1.조회
const fetchPost = async () => {
  try {
    // 0.progress 상태 처리
    loading.value = true;

    // 1.조회
    const { data } = await getPostById(props.id);
    //form.value = { ...data };
    setPost(data);
  } catch (err) {
    error.value = err;
  } finally {
    // 2.progress 상태 처리
    loading.value = false;
  }
};

// 2.v-model 맵핑 작업
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
// 3.호출
fetchPost();

const removeError = ref(null);
const removeLoading = ref(false);

// 1.삭제
const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    // 0.progress 상태 처리
    removeLoading.value = true;

    // 1.삭제
    await deletePosts(props.id);
    router.push({ name: 'PostList' });
  } catch (err) {
    removeError.value = err.message;
    console.error(err);
  } finally {
    // 2.progress 상태 처리
    removeLoading.value = false;
  }
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
