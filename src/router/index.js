import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RepoDetailsView from '../views/RepoDetailsView.vue';
import PageNotFoundView from '../views/PageNotFoundView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/repos/:repoName', component: RepoDetailsView },
  { path: '/:pathMatch(.*)*', component: PageNotFoundView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
