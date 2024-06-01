<script setup>
defineProps({
  data: String,
  fetchRepos: Function
});
</script>

<template>
  <div class="error-message text-center">
    <p>Oops, something went wrong while loading the {{ data }}</p>
    <p>Please check your internet connection and try again later</p>
    <button @click="fetchRepos">Retry</button>
  </div>
</template>

<style scoped>
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
