<script setup>
defineProps({
  isPrevButtonDisabled: Boolean,
  isNextButtonDisabled: Boolean,
  onPaginationButtonClick: Function,
  numberOfPages: Number,
  currentPage: Number
});
</script>

<template>
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
</template>
