
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/share-n-rent/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Configure JSX in JS files
      jsxRuntime: "automatic",
      include: "**/*.{jsx,js}",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.json'] // Explicitly define extensions
  },
}));
