<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <!-- 검색조건 시작-->
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <!-- params.title_like 가 v-model 지시자를 통해 
            양방향으로 맵핑되어 있고 watchEffect(fetchPosts); 가 선언되어 있어 
            반응형 데이터가 변경되었기 때문에 watchEffect 가 이를 체크해서 
            다시 콜백 메서드를 실행한다.
            (예전 처럼 복잡한 로직이 필요 없게 됐다.)
          -->
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
    <!-- 검색조건 끝-->

    <hr class="my-4" />
    <!-- Grid 형식으로 출력 시작-->
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
    <!-- Grid 형식으로 출력 끝-->

    <!--
      emits 이벤트 = @page="page => (params._page = page)"
    -->
    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="page => (params._page = page)"
    />
    <template v-if="posts && posts.length > 0">
      <!-- 상세보기 시작 -->
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
      <!-- 상세보기 끝-->
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppCard from '@/components/AppCard.vue';

import { getPosts } from '@/api/posts';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  //title_like: '1',
});

//페이지 토탈건수
const totalCount = ref(0);

//페이징 갯수
const pageCount = computed(() =>
  //소수점 올림 처리
  Math.ceil(totalCount.value / params.value._limit),
);

//async/await 문법
const fetchPosts = async () => {
  try {
    // 1.응답값에서 data, headers 속성만 추출
    const { data, headers } = await getPosts(params.value);
    posts.value = data;

    // 2.x-total-count 값은 하이픈이 포함되어 있어서 대괄호[] 표기법으로 추출
    totalCount.value = headers['x-total-count'];
  } catch (error) {
    console.error(error);
  }
};
//fetchPosts();

// watchEffect 으로 처리하면 fetchPosts 메소드 안에 반응형 데이터가
// 변경되면 콜백함수가 다시 실행된다.
// watchEffect는 watch와 다르게 초기에 한번 실행된다.
watchEffect(fetchPosts);

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

/* 
  1.Promise 문법
const fetchPosts = () => {
  getPosts()
    .then(response => {
      console.log('response : ', response);
    })
    .catch(error => {
      console.log('error : ', error);
    });
};

 2.async/await 문법
const fetchPosts = async () => {

  try {  
   2-1.호출 리턴 값 객체 로그 찍기.
   const response = await getPosts();
   console.dir(response); 

   2-2.호출 리턴 값 구조분해 할당. 결과값에서 data 속성만 추출
   const { data } = await getPosts();
   posts.value = data;

   2-3. 2-2와 같은 문법 : 왼쪽 결과를 오른쪽에 대입.
   ({ data: posts.value } = await getPosts());
  } catch (error) {
    console.error(error);
  }   
};
*/
</script>

<style lang="scss" scoped></style>
