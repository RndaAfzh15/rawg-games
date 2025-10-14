import { createRouter, createWebHistory } from "vue-router";
import GameList from "@/components/GameList.vue";
import GameDetail from "@/components/GameDetail.vue";
import Favorites from "@/components/Favorites.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "GameList", component: GameList },
    { path: "/game/:id", name: "GameDetail", component: GameDetail, props: true },
    { path: "/favorites", name: "Favorites", component: Favorites },
  ],
});

export default router;
