// from '.' 은 해당 디렉토리에 index.js 파일을 가져온다.
// posts 는 index.js에 정의 되어 있다.
import { posts } from '.';

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostById(id) {
  // ' 아니고, ` 이거임 get(`/${id}`) or get(id) 둘다 가능.
  // get(id) 이거는 데이터 타입 영향을 많이 받으니 get(`/${id}`) 이걸로 가자.
  return posts.get(`/${id}`);
}

export function createPost(data) {
  return posts.post('', data);
}

//전체수정 값을 안넘기면 빈값으로 나머지를 처리한다. (주의)
export function updatePostsAll(id, data) {
  return posts.put(`/${id}`, data);
}

//일부수정
export function updatePosts(id, data) {
  return posts.patch(`/${id}`, data);
}

export function deletePosts(id) {
  return posts.delete(`/${id}`);
}
