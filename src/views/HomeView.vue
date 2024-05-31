<script setup>
import RepoList from '../components/RepoList.vue';
</script>

<template>
  <header>
    <div className="wrapper">
      <h1>Joshua&apos;s Github Repos</h1>
    </div>
  </header>
  <RepoList />
</template>

<style scoped>
header {
  padding-block: 2rem;
  background-color: white;
}

header h1 {
  text-align: center;
  line-height: 1.1;
}
</style>
