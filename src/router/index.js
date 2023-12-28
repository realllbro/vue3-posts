import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';

import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';

import NotFoundView from '@/views/NotFoundView.vue';

import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    // 세미콜론(:) 은 동적라우팅 여러개의 URL을 하나의 페이지 컴포넌트에 맵핑하고자 할때 사용.
    // /user/alice
    // /user/bruce  -> PostDetailView /user/ 까지는 동일하게 기술하고 뒤에 달라지는 값은 세미콜론(:) 사용
    // /user/tom
    // 세미콜론(:) 으로 동적 할당된 URL 정보는 "$route" 객체에 params 로 받을 수 있다. ex) $route.params.id

    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    // props 속성으로 ":id" 을 받을 수 있다.
    props: true,
    // props: {word : 'hello'}, 객체도 넘길 수 있다.
    // props: route => ({ id: parseInt(route.params.id) }), //함수로 넘기기.
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    /* 중첩된 페이에 라우터 설정을 할때는 부모페이지에 children 속성에 넣어 준다.*/
    children: [
      /* default home 페이지 설정 */
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ],
  },
];

const router = createRouter({
  // 웹 히스토리 모드
  history: createWebHistory(),

  // 히스토리 해시 모드 url에 계속 #이 붙는다.
  //history: createWebHashHistory(),
  routes,
});

export default router;
