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
    path: '/main',
    name: 'main',
    component: () => import('../pages/layout'),
    // 只有经过身份验证的用户才能创建帖子
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../pages/home/index'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../components/HelloWorld'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../pages/about/index'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

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
  console.log(to);
  console.log(to.meta);
  // return false;
});

export default router;
