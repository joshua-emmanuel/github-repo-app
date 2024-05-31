<script setup>
import { ref, onErrorCaptured } from 'vue';

const error = ref(null);

function reloadPage() {
  location.reload();
}

onErrorCaptured((err) => {
  error.value = err;
  return false;
});
</script>

<template>
  <div v-if="error" class="error-boundary">
    <div class="wrapper" role="alert">
      <h2>Something went wrong:</h2>
      <pre>{{ error.message }}</pre>
      <button @click="reloadPage">Try again</button>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<style scoped>
.error-boundary {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.error-boundary .wrapper > * + * {
  margin-top: 0.75rem;
}

.error-boundary h2 {
  font-size: 2rem;
  text-transform: capitalize;
  line-height: 1.1;
  color: #b91c1c;
}

.error-boundary pre {
  font-size: 0.9rem;
}

.error-boundary button {
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 2rem;
  color: #fff;
  background-color: #082f49;
}
</style>
