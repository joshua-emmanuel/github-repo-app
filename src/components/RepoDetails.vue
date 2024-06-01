<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import LoadingStatus from './LoadingStatus.vue';
import GithubIcon from '../components/icons/GithubIcon.vue';

const repoDetails = ref({});
const status = ref('loading');

const route = useRoute();
const repoName = route.params.repoName;

function fetchRepoDetails() {
  status.value = 'loading';
  fetch(`https://api.github.com/repos/joshua-emmanuel/${repoName}`)
    .then((response) => response.json())
    .then((data) => {
      repoDetails.value = data;
      status.value = 'done';
    })
    .catch(() => {
      status.value = 'error';
    });
}

onMounted(() => fetchRepoDetails());
</script>

<template>
  <div class="repo-details">
    <div v-if="Object.keys(repoDetails).length > 0 && status === 'done'" class="wrapper">
      <div class="repo-details__text">
        <h1>
          <GithubIcon />
          <span>{{ repoDetails.name }}</span>
        </h1>
        <div class="repo-details__body-text">
          <p>Description: {{ repoDetails.description ?? 'No description' }}</p>
          <p>Main Language: {{ repoDetails.language }}</p>
          <p>Forks: {{ repoDetails.forks }}</p>
          <p>
            Live-Site:
            <span v-if="repoDetails.homepage === null">None</span>
            <a v-else :href="repoDetails.homepage" target="_blank">{{ repoDetails.homepage }}</a>
          </p>
        </div>
      </div>
      <div class="repo-details__btns">
        <RouterLink class="repo-details__btn" to="/">Go back home </RouterLink>
        <a class="repo-details__btn" :href="repoDetails.html_url"> View on github </a>
      </div>
    </div>
    <LoadingStatus data="repo details" v-else-if="status === 'loading'" />
    <div v-else-if="status === 'error'" class="error-message text-center">
      <p>Oops, something went wrong while loading the repo details</p>
      <p>Please check your internet connection and try again later</p>
      <button @click="fetchRepoDetails">Retry</button>
    </div>
  </div>
</template>

<style scoped>
.repo-details {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.repo-details h1 {
  font-size: 3rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.repo-details h1 img {
  width: 10%;
}

.repo-details__text a:hover {
  color: #111827;
  text-underline-offset: 0.2ex;
}

.repo-details__body-text {
  color: #374151;
}

.repo-details__btns {
  margin-top: 2rem;

  display: flex;
  gap: 0.5rem;
}

.repo-details__btn {
  text-decoration: none;
  font-size: 0.875rem;
  text-transform: capitalize;
  border-radius: 3rem;
  padding: 0.75rem 1rem;
  color: white;
  background-color: #082f49;
}

@media (max-width: 50em) {
  .repo-details h1 {
    font-size: 2rem;
    line-height: 1;
  }
}
</style>
