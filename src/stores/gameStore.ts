import { defineStore } from "pinia";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const useGameStore = defineStore("game", {
  state: () => ({
    games: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchGames() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
        console.log("✅ API response:", res.data); 
        this.games = res.data.results;
      } catch (err: any) {
        console.error("❌ API error:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
