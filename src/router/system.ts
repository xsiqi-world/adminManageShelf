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
    path: '/system/user',
    name: 'user',
    component: () => import('../pages/admin/user.vue'),
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
  // 角色列表
  {
    path: '/system/role/add',
    name: 'addRole',
    component: () => import('../pages/role/addRole.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

