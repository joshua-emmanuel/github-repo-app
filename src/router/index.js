import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RepoDetailsView from '../views/RepoDetailsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/repos/:repoName', component: RepoDetailsView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
