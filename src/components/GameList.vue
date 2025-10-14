<template>
  <div class="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition">
    <h1 class="text-2xl font-bold mb-4 text-center">🎮 RAWG Game List</h1>

    <!-- Search -->
    <SearchBar @search="handleSearch" />

    <!-- Game grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <router-link
        v-for="game in games"
        :key="game.id"
        :to="`/game/${game.id}`"
        class="border rounded-md overflow-hidden shadow hover:shadow-lg transition block
               bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <img
          :src="game.background_image"
          alt="cover"
          class="w-full h-40 object-cover"
        />
        <div class="p-2">
          <h2 class="font-semibold text-sm mb-1">{{ game.name }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ game.released || "Unknown" }}
          </p>
        </div>
      </router-link>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-4">
      <button
        class="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        @click="prevPage"
        :disabled="page === 1"
      >
        Prev
      </button>

      <span class="font-medium">Page {{ page }}</span>

      <button
        class="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import SearchBar from "./SearchBar.vue";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const games = ref<any[]>([]);
const page = ref(1);
const query = ref("");

// Fetch function
async function loadGames() {
  let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page.value}&page_size=12`;

  if (query.value) {
    url = `https://api.rawg.io/api/games?search=${query.value}&key=${apiKey}&page=${page.value}&page_size=12`;
  }

  const res = await axios.get(url);
  games.value = res.data.results;
}

function nextPage() {
  page.value++;
}
function prevPage() {
  if (page.value > 1) page.value--;
}
function handleSearch(val: string) {
  query.value = val;
  page.value = 1; // reset ke halaman pertama
  loadGames();
}

onMounted(loadGames);
watch(page, loadGames);
</script>
