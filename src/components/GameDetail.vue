<template>
  <div class="p-4 max-w-3xl mx-auto">
    <button
      @click="$router.back()"
      class="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
    >
      ← Back
    </button>

    <div v-if="game" class="space-y-4">
      <img
        :src="game.background_image"
        alt="cover"
        class="w-full rounded-lg shadow"
      />

      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">{{ game.name }}</h1>

        <button
          @click="toggleFavorite"
          :class="[
            'px-4 py-2 rounded text-white transition',
            isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
          ]"
        >
          {{ isFavorite ? '★ Remove Favorite' : '☆ Add Favorite' }}
        </button>
      </div>

      <p class="text-gray-600 text-sm">
        Released: {{ game.released || "Unknown" }}
      </p>
      <p class="text-yellow-600 font-semibold">⭐ {{ game.rating }}</p>

      <div v-html="game.description" class="prose"></div>
    </div>

    <div v-else class="text-center text-gray-500">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const game = ref<any>(null);
const isFavorite = ref(false);

onMounted(async () => {
  const id = route.params.id;
  const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
  game.value = res.data;

  checkFavorite();
});

function toggleFavorite() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (isFavorite.value) {
    // Hapus dari favorit
    const updated = favorites.filter((g: any) => g.id !== game.value.id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    isFavorite.value = false;
  } else {
    // Tambah ke favorit
    favorites.push({
      id: game.value.id,
      name: game.value.name,
      background_image: game.value.background_image,
      released: game.value.released,
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    isFavorite.value = true;
  }
}

function checkFavorite() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  isFavorite.value = favorites.some((g: any) => g.id === game.value?.id);
}
</script>
