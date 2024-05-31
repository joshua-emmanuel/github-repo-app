<script setup>
import { RouterView } from 'vue-router';
import ErrorBoundary from './components/ErrorBoundary.vue';
</script>

<template>
  <div>
    <ErrorBoundary>
      <RouterView />
    </ErrorBoundary>
  </div>
</template>
