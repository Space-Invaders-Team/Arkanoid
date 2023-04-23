// ../client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import dotenv from "dotenv";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\pennycat\\git\\practicum\\Arkanoid\\packages\\client";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  plugins: [
    react(),
    checker({ typescript: true })
  ],
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]--[hash:base64:5]"
    }
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
        sw: "./sw.ts"
      },
      output: {
        entryFileNames: (assetInfo) => assetInfo.name === "sw" ? "[name].js" : "assets/js/[name]-[hash].js"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "static")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVubnljYXRcXFxcZ2l0XFxcXHByYWN0aWN1bVxcXFxBcmthbm9pZFxcXFxwYWNrYWdlc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlbm55Y2F0XFxcXGdpdFxcXFxwcmFjdGljdW1cXFxcQXJrYW5vaWRcXFxccGFja2FnZXNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZW5ueWNhdC9naXQvcHJhY3RpY3VtL0Fya2Fub2lkL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiOy8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcyAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5DTElFTlRfUE9SVCkgfHwgMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY2hlY2tlcih7IHR5cGVzY3JpcHQ6IHRydWUgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICBtb2R1bGVzOiB7XG4gICAgICBsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlJyxcbiAgICAgIGdlbmVyYXRlU2NvcGVkTmFtZTogJ1tuYW1lXV9fW2xvY2FsXS0tW2hhc2g6YmFzZTY0OjVdJyxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGFwcDogJy4vaW5kZXguaHRtbCcsXG4gICAgICAgIHN3OiAnLi9zdy50cycsXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdydcbiAgICAgICAgICA/ICdbbmFtZV0uanMnXG4gICAgICAgICAgOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnKVxuICAgICAgICAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3N0YXRpYycpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFMeEIsSUFBTSxtQ0FBbUM7QUFPekMsT0FBTyxPQUFPO0FBSWQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxXQUFXLEtBQUs7QUFBQSxFQUMzQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNQLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLElBQ3RCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWUsVUFBVSxTQUFTLE9BQy9DLGNBQ0E7QUFBQSxNQUVOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
