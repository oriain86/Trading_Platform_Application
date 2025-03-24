// File: vite.config.js

// This file configures Vite for building and serving the React application

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  // Configure plugins
  plugins: [
    // Enable React support in Vite
    // This handles JSX transformation and provides React-specific features
    react()
  ],
  
  // Configure module resolution
  resolve: {
    alias: {
      // Set up the "@" path alias to point to the src directory
      // This enables imports like: import Button from "@/components/Button"
      // instead of relative paths like: import Button from "../../components/Button"
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Additional configurations could be added here:
  // server: {
  //   port: 3000,              // Custom development server port
  //   open: true,              // Auto-open browser on server start
  //   proxy: {}                // API proxy settings
  // },
  // build: {
  //   outDir: 'dist',          // Output directory
  //   minify: 'terser',        // Specify minifier
  //   sourcemap: true,         // Generate sourcemaps
  // },
  // css: {
  //   devSourcemap: true,      // CSS sourcemaps in development
  // }
}) 
