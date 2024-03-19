import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/PageMain.vue';
import Editor from '@/views/PageEditor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'editor',
    component: Editor,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
