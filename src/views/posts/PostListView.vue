<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <!-- Grid 형식으로 출력-->
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
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="2"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';

import { getPosts } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const fetchPosts = () => {
  posts.value = getPosts();
};
fetchPosts();
const goPage = id => {
  // 1.url : http://localhost:5173/posts/1
  // router.push('/posts/' + id);

  // 2.url : http://localhost:5173/posts/$(id)
  // router.push('/posts/$(id)');

  // 객체 및 이름으로 호출
  // 3.url : http://localhost:5173/posts/1?searchText=hello#world!
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
</script>

<style lang="scss" scoped></style>
