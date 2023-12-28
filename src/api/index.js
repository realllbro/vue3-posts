import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options));
  return instance;
}
//환경변수 적용
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);

//export const posts = create('http://localhost:5000/posts');
