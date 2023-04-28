import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { getSession } from '/@/utils';
import { ElMessage } from 'element-plus';

import ruleRoutes from './rule';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue'),
  },
  // {
  //   path: '*',
  //   component: () => import('../pages/login/index'),
  // },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue'),
    // 只有经过身份验证的用户才能创建帖子
    meta: {
      keepAlive: true
    },
    children: [],
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../pages/role/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/about/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/about/index.vue'),
    meta: {
      keepAlive: true,
      requiresAuth: true,
    },
  },
  {
    path: '/formMarking',
    name: 'formMarking',
    component: () => import('../pages/formMarking/index.vue'),
    meta: {
      keepAlive: true,
      requiresAuth: true,
    },
  },
  ...ruleRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const roles = [
  {
    id: 1,
    path: '/role'
  },
  {
    id: 2,
    path: '/home'
  },
  {
    id: 3,
    path: '/about'
  }
]

// 跳转前检查
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  // if (to.meta.requiresAuth && !auth.isLoggedIn()) {
  if (to.meta.requiresAuth && !getSession('AccessToken')) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    ElMessage({
      showClose: true,
      message: '用户验证有误, 请重新登录',
      type: 'error',
    });
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
  // console.log('to', to);
  // console.log('meta', to.meta);
  // return false;
});

export default router;
