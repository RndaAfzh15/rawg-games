<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">❤️ Favorite Games</h1>

    <transition-group
      name="fade-slide"
      tag="div"
      class="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <div
        v-for="game in favorites"
        :key="game.id"
        class="relative overflow-hidden select-none rounded-md shadow hover:shadow-lg transition"
        @touchstart="startSwipe($event, game.id)"
        @touchmove="moveSwipe($event, game.id)"
        @touchend="endSwipe(game.id)"
        :style="{
          transform: `translateX(${getTranslateX(game.id)}px)`,
          transition: isSwiping
            ? 'none'
            : 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        }"
      >
        <!-- Background merah untuk delete -->
        <div
          class="absolute top-0 right-0 bottom-0 flex items-center justify-end pr-4 bg-red-500 text-white font-semibold w-full"
        >
          Delete
        </div>

        <!-- Konten Game -->
        <div class="relative z-10 bg-white dark:bg-gray-800">
          <router-link :to="`/game/${game.id}`">
            <img
              :src="game.background_image"
              alt="cover"
              class="w-full h-40 object-cover"
            />
          </router-link>
          <div class="p-2 flex justify-between items-center">
            <h2 class="font-semibold text-sm">{{ game.name }}</h2>
            <button
              class="text-red-500 text-sm"
              @click.stop="handleDelete(game.id)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </transition-group>

    <p v-if="!favorites.length" class="text-center text-gray-500">
      Belum ada game favorit 😢
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const favorites = ref<any[]>([]);
const swipeData = ref<{ [key: number]: { startX: number; translateX: number } }>(
  {}
);
const isSwiping = ref(false);

onMounted(() => {
  loadFavorites();
});

function loadFavorites() {
  favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
}

function removeFavorite(id: number) {
  const updated = favorites.value.filter((g) => g.id !== id);
  favorites.value = updated;
  localStorage.setItem("favorites", JSON.stringify(updated));
}

// Tombol delete manual → animasi fade out dulu
async function handleDelete(id: number) {
  const index = favorites.value.findIndex((g) => g.id === id);
  if (index === -1) return;

  // trigger animasi manual
  swipeData.value[id] = { startX: 0, translateX: -100 };
  await nextTick();
  swipeData.value[id].translateX = -window.innerWidth;

  // kasih delay biar animasi kelar
  setTimeout(() => removeFavorite(id), 250);
}

// === SWIPE GESTURE LOGIC ===
function startSwipe(event: TouchEvent, id: number) {
  const touch = event.touches[0];
  swipeData.value[id] = { startX: touch.clientX, translateX: 0 };
  isSwiping.value = true;
}

function moveSwipe(event: TouchEvent, id: number) {
  const touch = event.touches[0];
  const deltaX = touch.clientX - swipeData.value[id].startX;

  if (deltaX < 0) {
    // elastis effect (ngerem pas -150px)
    const resistance =
      deltaX < -150 ? -150 - Math.pow(-deltaX - 150, 0.8) : deltaX;
    swipeData.value[id].translateX = resistance;
  }
}

function endSwipe(id: number) {
  isSwiping.value = false;
  const translateX = swipeData.value[id]?.translateX || 0;

  if (translateX < -100) {
    swipeData.value[id].translateX = -window.innerWidth;
    setTimeout(() => removeFavorite(id), 250);
  } else {
    swipeData.value[id].translateX = 0;
  }
}

function getTranslateX(id: number) {
  return swipeData.value[id]?.translateX || 0;
}
</script>

<style scoped>
/* Transition untuk fade + slide keluar */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}

div[v-for] {
  will-change: transform;
  touch-action: pan-y;
}
</style>
