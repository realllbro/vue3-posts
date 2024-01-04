<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <!-- 검색조건 시작-->
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    ></PostFilter>
    <!-- 검색조건 끝-->

    <hr class="my-4" />

    <!-- 1.progress -->
    <AppLoading v-if="loading" />

    <!-- 2.오류시 메시지 처리  -->
    <AppError v-else-if="error" :message="error.message" />

    <!-- 3.정상처리  -->
    <template v-else>
      <!-- Grid 형식으로 출력 시작-->
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>
      <!-- Grid 형식으로 출력 끝-->

      <!--
      emits 이벤트 = @page="page => (params._page = page)"
    -->
      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>

    <!-- a-1.뷰3에 추가된 내장컴포넌트 Teleport는
       특정 DOM 으로 위치이동시킬 때 사용한다. -->
    <Teleport to="#modal">
      <!-- PostModal은 AppModalCustom 사용 v-model로 구현함.-->
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreateAt"
      />
    </Teleport>

    <!-- a-2.AppModal 컴포넌트 사용 props, emits로 구현함.-->
    <!-- <AppModal :show="show" title="게시글" @close="closeModal">
        <template #default>
          <div class="row g-3">
            <div class="col-3 text-muted">제목:</div>
            <div class="col-9">{{ modalTitle }}</div>
            <div class="col-3 text-muted">내용:</div>
            <div class="col-9">{{ modalContent }}</div>
            <div class="col-3 text-muted">등록일:</div>
            <div class="col-9">{{ modalCreateAt }}</div>
          </div>
        </template>

        <template #actions>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            닫기
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </template>
      </AppModal>      
     끝 -->

    <!-- 상세보기 시작 -->
    <!-- previewId 가 있을때만 렌더링 한다. -->
    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <!-- 자식 컴포넌트에 props 속성으로 previewId 를 넘긴다. -->
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
    <!-- 상세보기 끝-->
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();

//toRef, toRefs 예제
const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  //title_like: '1',
});

// 1.컴포저블 함수로 리팩토링 - 목록조회
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params });

// 페이지 토탈 카운트는 헤더에 있다.
const totalCount = computed(() => response.value.headers['x-total-count']);

//페이징 갯수
const pageCount = computed(() =>
  //소수점 올림 처리
  Math.ceil(totalCount.value / params.value._limit),
);

// 1.url : ex)http://localhost:5173/posts/1
// router.push('/posts/' + id);

// 2.url : ex)http://localhost:5173/posts/$(id)
// router.push('/posts/$(id)');

// 객체 및 이름으로 호출시
// 3.url : ex)http://localhost:5173/posts/1?searchText=hello#world!
const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
    query: {
      searchText: 'hello',
    },
    hash: '#world!',
  });
};

// modal
const modalTitle = ref();
const modalContent = ref();
const modalCreateAt = ref();

const show = ref(false);
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreateAt.value = createdAt;
};

const closeModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
