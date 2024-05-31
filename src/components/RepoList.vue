<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
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
    .catch((error) => {
      console.log(error);
      status.value = 'error';
    });
}

function onPaginationButtonClick(pageNumber) {
  currentPage.value = pageNumber;
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
      <form class="repo-list__search">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          @input="onSearchInputChange"
          type="text"
          name="search-input"
          placeholder="Search for repos"
        />
      </form>
      <div class="repos" v-if="filteredRepos.length > 0 && status === 'done'">
        <div
          v-for="repo in filteredRepos.slice(
            (currentPage - 1) * REPOS_PER_PAGE,
            currentPage * REPOS_PER_PAGE
          )"
          :key="repo.id"
        >
          <div className="repo">
            <div className="repo__title">
              <GithubIcon />
              <h2>{{ repo.name }}</h2>
            </div>
            <RouterLink :to="{ path: `/repos/${repo.name}` }"></RouterLink>
          </div>
        </div>
      </div>
      <div v-else-if="status === 'loading'">
        <p class="text-center">Loading Repositories</p>
      </div>
      <div v-else-if="status === 'error'" class="error-message text-center">
        <p>Oops, something went wrong while loading the repositories.</p>
        <p>Please check your internet connection and try again later</p>
        <button @click="fetchRepos">Retry</button>
      </div>
      <div v-if="searchQuery && filteredRepos.length === 0 && status === 'done'">
        <p class="text-center">No repos found for search query '{{ searchQuery }}'</p>
      </div>
      <div class="pagination" v-if="filteredRepos.length > 0">
        <button :disabled="isPrevButtonDisabled" @click="onPaginationButtonClick(currentPage - 1)">
          Prev
        </button>
        <button
          v-for="number in numberOfPages"
          @click="onPaginationButtonClick(number)"
          :key="number"
          :class="currentPage === number ? 'active' : ''"
        >
          {{ number }}
        </button>
        <button :disabled="isNextButtonDisabled" @click="onPaginationButtonClick(currentPage + 1)">
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
*:focus {
  outline-color: #082f49;
}

.repo-list {
  margin-block: 3rem;
}

.repo-list__search {
  margin-bottom: 2rem;
  width: 100%;
  position: relative;
}

.repo-list__search svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;
  fill: #777e8a;
}

.repo-list__search input {
  width: 100%;
  padding: 1rem;
  padding-left: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  background-color: white;
}

.repo-list__search input:hover {
  border: 1px solid rgba(0, 0, 0, 0.35);
}

.repo-list__search input:focus {
  outline-color: #082f49;
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
.text-center {
  text-align: center;
}

.error-message > * + * {
  margin-top: 0.5rem;
}

.error-message button {
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #082f49;
}
</style>
