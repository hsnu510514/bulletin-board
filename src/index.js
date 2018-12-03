import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// 設定預設axios URL
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
// 設定預設header (後面可指定common(通用)/post....)
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 在全部的request發生時啟動 (request發動情況 ex.無網路連線)
axios.interceptors.request.use(request => {
  // !!!! 回傳request，後續的request才能繼續執行 (可在此加工request)
  return request;
}, error => {
  console.log(error);
  // 回傳error的格式不一樣，需這樣才可被catch到
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
