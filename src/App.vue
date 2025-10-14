<template>
  <div :class="{ dark: isDark }">
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
    >
      <!--  Responsive Navbar -->
      <nav
        class="p-4 bg-gray-800 dark:bg-gray-700 text-white flex items-center justify-between"
      >
        <!-- Logo -->
        <div class="text-lg font-semibold">
          🎮 RAWG Games
        </div>

        <!-- Hamburger Button -->
        <button
          class="md:hidden text-2xl focus:outline-none"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>

        <!-- Navigation Links -->
        <div
          :class="[
            'flex flex-col md:flex-row md:items-center md:gap-4 absolute md:static left-0 top-[64px] w-full md:w-auto bg-gray-800 dark:bg-gray-700 md:bg-transparent transition-all duration-300 ease-in-out z-10',
            menuOpen ? 'max-h-40 p-4' : 'max-h-0 overflow-hidden md:max-h-full',
          ]"
        >
          <router-link
            to="/"
            class="py-2 md:py-0 hover:underline text-center"
            @click="closeMenu"
          >
            Home
          </router-link>

          <router-link
            to="/favorites"
            class="py-2 md:py-0 hover:underline text-center"
            @click="closeMenu"
          >
            Favorites
          </router-link>

          <button
            @click="toggleDarkMode"
            class="mt-2 md:mt-0 px-2 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500 transition text-center"
          >
            {{ isDark ? "☀️ Light" : "🌙 Dark" }}
          </button>
        </div>
      </nav>

      <!-- Page Content -->
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);
const menuOpen = ref(false);

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

function toggleDarkMode() {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
}

function closeMenu() {
  menuOpen.value = false;
}
</script>
