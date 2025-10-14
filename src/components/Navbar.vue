<template>
  <nav
    class="bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md"
  >
    <!-- Logo -->
    <RouterLink to="/" class="text-lg font-bold tracking-wide">
      🎮 RAWG Games
    </RouterLink>

    <!-- Hamburger Button (Mobile) -->
    <button
      class="md:hidden text-2xl focus:outline-none"
      @click="isOpen = !isOpen"
    >
      ☰
    </button>

    <!-- Menu Links -->
    <div
      :class="[
        'flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static left-0 top-full w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-40 p-4' : 'max-h-0 overflow-hidden md:max-h-full',
      ]"
    >
      <RouterLink
        to="/"
        class="py-2 md:py-0 hover:text-gray-300"
        @click="closeMenu"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/favorites"
        class="py-2 md:py-0 hover:text-gray-300"
        @click="closeMenu"
      >
        Favorites
      </RouterLink>

      <!-- Theme toggle -->
      <button
        class="py-2 md:py-0 hover:text-gray-300"
        @click="toggleTheme"
      >
        {{ theme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
const theme = ref(localStorage.getItem("theme") || "light");

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", theme.value === "dark");
  localStorage.setItem("theme", theme.value);
}

function closeMenu() {
  isOpen.value = false;
}

//pastikan theme aktif saat load
onMounted(() => {
  document.documentElement.classList.toggle("dark", theme.value === "dark");
});
</script>
