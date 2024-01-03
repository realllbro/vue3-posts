import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(
    Object.assign({ baseURL, withCredentials: true }, options),
  );
  return instance;
}
//환경변수 적용
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);

//export const posts = create('http://localhost:5000/posts');

// CORS 크로스 도메인 오류 발생하면 axios 조치
// axios.defaults.withCredentials = true;
