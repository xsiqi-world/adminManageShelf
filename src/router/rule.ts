const routes = [
  {
    path: '/home/rule/list',
    name: 'rule',
    component: () => import('../pages/rule/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/home/menu/list',
    name: 'menu',
    component: () => import('../pages/menu/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

