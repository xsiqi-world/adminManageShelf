const routes = [
  // 权限列表
  {
    path: '/system/rule',
    name: 'rule',
    component: () => import('../pages/rule/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/system/menu',
    name: 'menu',
    component: () => import('../pages/menu/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  // 角色列表
  {
    path: '/system/role',
    name: 'role',
    component: () => import('../pages/role/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

