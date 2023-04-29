const routes = [
  // 权限列表
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
  // 角色列表
  {
    path: '/home/role',
    name: 'role',
    component: () => import('../pages/role/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

