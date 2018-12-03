import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;

// 可將instance與default搭配使用，使用時在欲使用的檔案匯入此instance即可 ex. import axiosInstance from '../../axios'