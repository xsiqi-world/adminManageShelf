import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index'),
  },
  // {
  //   path: '*',
  //   component: () => import('../pages/login/index'),
  // },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index'),
    // 只有经过身份验证的用户才能创建帖子
    meta: {
      requiresAuth: true,
      keepAlive: true
    },
    children: [],
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../pages/role/index'),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/about/index'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 跳转前检查
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  // if (to.meta.requiresAuth && !auth.isLoggedIn()) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: to.fullPath },
  //   }
  // }
  console.log('to', to);
  console.log('meta', to.meta);
  // return false;
});

export default router;
