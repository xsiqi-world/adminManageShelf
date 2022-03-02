import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: "/test",
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home'),
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('../components/HelloWorld')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../pages/about')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;