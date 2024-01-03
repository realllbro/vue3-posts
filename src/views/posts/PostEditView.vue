<template>
  <!-- 1.progress -->
  <AppLoading v-if="loading" />

  <!-- 2.오류시 메시지 처리  -->
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
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
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
    <!-- App.vue 레이어로 위치 옮김 
      <AppAlertMulti :items="alerts" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePosts } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

import { useAlert } from '@/composables/alert';

// App.vue 레이어로 위치 옮김
// const { alerts, vAlertMulti, vSuccess } = useAlert();
const { vAlertMulti, vSuccess } = useAlert();

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// ref 변수선언
const form = ref({
  title: null,
  content: null,
});

const error = ref(null);
const loading = ref(false);

// 1.조회
const fetchPost = async () => {
  try {
    // 0.progress 상태 처리
    loading.value = true;

    // 1.조회
    const { data } = await getPostById(id);
    //form.value = { ...data };
    setForm(data);
  } catch (err) {
    error.value = err;
    //vAlert('네트워크 오류!');
    vAlertMulti(err.message);
  } finally {
    // 2.progress 상태 처리
    loading.value = false;
  }
};

// 2.v-model 맵핑 작업
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
fetchPost();

const editError = ref(null);
const editLoading = ref(false);

// 3.수정
const edit = async ({ title, content }) => {
  try {
    // 0.progress 상태 처리
    editLoading.value = true;

    // 1.수정
    await updatePosts(id, { ...form.value });
    //vAlert('수정이 완료되었습니다!!!', 'success');
    vSuccess('수정이 완료되었습니다!!!');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (err) {
    editError.value = err;
    console.error(err);
    vAlertMulti(err.message);
  } finally {
    // 2.progress 상태 처리
    editLoading.value = false;
  }
  form.value.title = title;
  form.value.content = content;
};

const goDetailPage = () =>
  router.push({ name: 'PostDetail', params: { id: id } });

//alert 2초 뒤에 사라지게 설정.
/* vAlert 배열(멀티)가 아닌 단일건 처리
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

const vAlert = (message, type = 'error') => {
  showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
*/

// 반응형 배열로 멀티건 처리
/* composables 함수로 리팩토링 하면서 주석처리
const alerts = ref([]);

const vAlertMulti = (message, type = 'error') => {
  alerts.value.push({ message, type });
  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};

const vSuccess = message => vAlertMulti(message, 'success');
*/
</script>

<style lang="scss" scoped></style>
