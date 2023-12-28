// from '.' 은 해당 디렉토리에 index.js 파일을 가져온다.
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

export function updatePosts(id, data) {
  return posts.put(`/${id}`, data);
}

export function deletePosts(id) {
  return posts.delete(`/${id}`);
}
