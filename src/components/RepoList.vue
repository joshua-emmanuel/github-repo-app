<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import RepoPagination from './RepoPagination.vue';
import RepoSearch from './RepoSearch.vue';
import LoadingStatus from './LoadingStatus.vue';
import ErrorMessage from './ErrorMessage.vue';
import GithubIcon from './icons/GithubIcon.vue';

const searchQuery = ref('');
const repos = ref([]);
const status = ref('loading');
const currentPage = ref(1);
const REPOS_PER_PAGE = 12;

const filteredRepos = computed(() =>
  repos.value.filter((repo) => repo.name.toLowerCase().includes(searchQuery.value))
);

const totalNumberOfRepos = computed(() => filteredRepos.value.length);
const numberOfPages = computed(() => Math.ceil(totalNumberOfRepos.value / REPOS_PER_PAGE));

const isPrevButtonDisabled = computed(() => currentPage.value === 1);
const isNextButtonDisabled = computed(() => currentPage.value === numberOfPages.value);

function fetchRepos() {
  status.value = 'loading';
  fetch(`https://api.github.com/users/joshua-emmanuel/repos?per_page=10000`)
    .then((response) => response.json())
    .then((data) => {
      repos.value = data;
      status.value = 'done';
    })
    .catch(() => {
      status.value = 'error';
    });
}

function onPaginationButtonClick(pageNumber) {
  currentPage.value = pageNumber;
  window.scrollTo(0, 0);
}

function onSearchInputChange(event) {
  currentPage.value = 1;
  searchQuery.value = event.target.value.trim().toLowerCase();
}

onMounted(() => {
  fetchRepos();
});
</script>

<template>
  <section class="repo-list">
    <div class="wrapper">
      <RepoSearch :onSearchInputChange="onSearchInputChange" />
      <div class="repos" v-if="filteredRepos.length > 0 && status === 'done'">
        <div
          v-for="repo in filteredRepos.slice(
            (currentPage - 1) * REPOS_PER_PAGE,
            currentPage * REPOS_PER_PAGE
          )"
          :key="repo.id"
        >
          <div class="repo">
            <div class="repo__title">
              <GithubIcon />
              <h2>{{ repo.name }}</h2>
            </div>
            <RouterLink :to="{ path: `/repos/${repo.name}` }"></RouterLink>
          </div>
        </div>
      </div>
      <LoadingStatus data="repositories" v-else-if="status === 'loading'" />
      <ErrorMessage data="repositories" v-else-if="status === 'error'" />
      <div v-if="searchQuery && filteredRepos.length === 0 && status === 'done'">
        <p class="text-center">No repos found for search query '{{ searchQuery }}'</p>
      </div>
      <div class="pagination" v-if="filteredRepos.length > 0">
        <RepoPagination
          :isPrevButtonDisabled="isPrevButtonDisabled"
          :isNextButtonDisabled="isNextButtonDisabled"
          :onPaginationButtonClick="onPaginationButtonClick"
          :numberOfPages="numberOfPages"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </section>
</template>

<style>
*:focus {
  outline: 2px solid #082f49;
}

.repo-list {
  margin-block: 3rem;
}

.repos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.repo {
  position: relative;
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: #082f49;
  background-color: #fff;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0 4px 6px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.15s ease;
}

.repo__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.repo__title img {
  width: 8%;
}

.repo h2 {
  font-size: 1.25rem;
}

.repo a {
  text-decoration: none;
  display: block;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.repo:has(a:hover) {
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0 6px 14px rgba(0, 0, 0, 0.08);
}

@media (max-width: 75em) {
  .repos {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 50em) {
  .repos {
    grid-template-columns: 1fr;
  }
}

.pagination {
  margin-block: 2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.pagination button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #082f49;
  border-radius: 0.25rem;
  background-color: #fff;
  transition: all 200ms ease-in;
}

.pagination button.active,
.pagination button:not([disabled]):hover {
  color: white;
  background-color: #082f49;
}

.pagination button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
