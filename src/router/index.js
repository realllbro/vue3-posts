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
import MyPage from '@/views/MyPage.vue';

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
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    /*    
    // 라우트 네비게이션 가드 2. 라우트의 설정 객체에 직접 정의
    beforeEnter: (to, from) => {
      // console.log('to: ', to);
      // console.log('from: ', from);
      // return false;
      // 객체 또는 주소로 리턴.
      //return { name: 'Home' };
      // return '/posts';
      // url에 QueryString 처리.
      console.log(to.query);

      // 1.Object.keys 쿼리스트링을 배열로 리턴.
      // 쿼리스트링이 존재하면 query: {} 로 초기화 후 이동.
      if (Object.keys(to.query).length > 0) {
        return { path: to.path, query: {} };
      }
    },
    */
    // 라우트 네비게이션 가드 3. 라우트의 설정 객체에 배열로 여러개 지정 가능.
    beforeEnter: [removeQueryString],
  },
];

function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    return { path: to.path, query: {} };
  }
}

const router = createRouter({
  // 웹 히스토리 모드
  history: createWebHistory(),

  // 히스토리 해시 모드 url에 계속 #이 붙는다.
  //history: createWebHashHistory(),
  routes,
});

/*
  라우트 네비게이션 가드 1. 전역가드
  Global Before Guards
  라우팅 되는 객체와 되기 전의 객체를 받는다.
  네비게이션을 취소하려면 명시적으로 false를 반환합니다.

router.beforeEach((to, from) => {
  console.log('to: ', to);
  console.log('from: ', from);

  // 이동하려는 페이지 이름이 MyPage 는 리턴되게
  if (to.name === '!MyPage') {
    return false;
  }
  if (to.name === 'MyPage') {
    //같은효과 router.push({ name: 'Home' });

    // 객체 또는 주소로 리턴.
    //return { name: 'Home' };
    return '/posts';
  }
});
*/

export default router;
