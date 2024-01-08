<template>
  <!-- 1.progress -->
  <AppLoading v-if="loading" />

  <!-- 2.오류시 메시지 처리  -->
  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      <!-- 전역변수로 선언한 $dayjs 플러그인 템플릿에서 사용방법 -->
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError" />
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
      <!-- 컴포넌트 네비게이션 가드 테스트용 -->
      <div class="row g-1">
        <div class="col-auto">
          <button
            class="btn btn-outline-dark"
            @click="$router.push('/posts/10')"
          >
            onBeforeRouteUpdate
          </button>
        </div>
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
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { useNumber } from '@/composables/number';
import { computed, toRef, toRefs } from 'vue';

// App.vue 레이어로 위치 옮김
// const { alerts, vAlertMulti, vSuccess } = useAlert();
const { vAlertMulti, vSuccess } = useAlert();

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
 * 
  // ref 변수선언
  const post = ref({
    title: null,
    content: null,
    createdAt: null,
  });
 */

// toRef, toRefs 사용예
// toRef 사용시
// const idRef = toRef(props, 'id');

// toRefs 사용시
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);

// 상세보기 id 값에 따라 watchEffect 함수가 동작하게 url 반응형 데이터로 변경
const url = computed(() => `/posts/${props.id}`);

// 1.컴포저블 함수로 리팩토링-조회
// const { data: post, error, loading } = useAxios(`/posts/${props.id}`);
const { data: post, error, loading } = useAxios(url);

// 2.컴포저블 함수로 리팩토링-삭제
const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료 되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlertMulti(err.message);
    },
  },
);

// 3.삭제
const remove = () => {
  if (confirm('삭제 하시겠습니까?') === false) {
    return;
  }
  execute();
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });

//컴포넌트 네비게이션 가드 1.Composition API 사용
// onBeforeRouteUpdate url 경로가 변경되었을때
onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate');
});
// 화면을 떠날때
onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave');
});
</script>

<script>
//컴포넌트 네비게이션 가드 2.Options API 사용
// 화면을 들어올때
export default {
  beforeRouteEnter() {
    console.log('beforeRouteEnter');
  },
};
</script>

<style lang="scss" scoped></style>
