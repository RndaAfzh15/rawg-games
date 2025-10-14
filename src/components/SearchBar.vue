<template>
  <div class="mb-4 flex justify-center">
    <input
      v-model="searchTerm"
      @input="onInput"
      type="text"
      placeholder="Search games..."
      class="border rounded px-3 py-2 w-full md:w-1/2 focus:outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchTerm = ref("");
const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

function onInput() {
  emit("search", searchTerm.value);
}
</script>
