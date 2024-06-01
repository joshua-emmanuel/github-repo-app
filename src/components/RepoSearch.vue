<script setup>
defineProps({
  onSearchInputChange: Function
});
</script>

<template>
  <form class="repo-search">
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
</template>

<style scoped>
.repo-search {
  margin-bottom: 2rem;
  width: 100%;
  position: relative;
}

.repo-search svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;
  fill: #777e8a;
}

.repo-search input {
  width: 100%;
  padding: 1rem;
  padding-left: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  background-color: white;
}

.repo-search input:hover {
  border: 1px solid rgba(0, 0, 0, 0.35);
}

.repo-search input:focus {
  outline-color: #082f49;
}
</style>
