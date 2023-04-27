import { ref } from 'vue';
import axios from 'axios';
// import { baseUrl } from './api.js'
// import config from '/@/config/index';

//导入 Nprogress进度条包对应的js和css
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// import { MessageBox } from 'element-ui';
import { ElLoading, ElMessage } from 'element-plus'

import router from '/@/router';
import { getSession } from '../utils';

const http = axios.create({
  // baseURL: config.baseUrl,
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

//配置请求的根路径
// axios.defaults.baseURL = 'http://www.tp6.com'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const loading = ref();

// 请求拦截器,请求预处理
http.interceptors.request.use(
  config => {
    // console.log(config);
    // NProgress.start(); // 打开进度条
    loading.value = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    // 为请求头对象添加token验证的Authorization字段
    config.headers.Authorization = getSession('AccessToken') ? 'Bearer ' + getSession('AccessToken') : '';
    config.headers.sessionid = window.sessionStorage.getItem('sessionId');
    return config;
  },
  error => {
    alert('错误的传参');
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    // if (response.data.code == 102) {
    //   //没有权限
    //   MessageBox.confirm(response.data.error, {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {});
    // } else if (response.data.code == 101) {
    //   //登录失效
    //   MessageBox.confirm(response.data.error, {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {
    //     sessionStorage.clear(); // 清除缓存
    //     // location.replace("/login"); // 跳转登录页
    //   });
    //   router.push('/');
    // } else if (response.data.code == 103) {
    //   //账号被删除或禁用
    //   MessageBox.confirm(response.data.error, {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {
    //     sessionStorage.clear(); // 清除缓存
    //     // location.replace("/login"); // 跳转登录页
    //   });
    //   router.push('/');
    // }

    // token失效
    if (response.data.code == 401) {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: 'error',
      });
      router.push('/');
    }

    if (response.data.code != 200) {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: 'error',
      });
    }

    // NProgress.done(); // 关闭进度条
    loading.value.close();
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/* 统一封装get请求 */
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        params: params,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export { http, post, get };
