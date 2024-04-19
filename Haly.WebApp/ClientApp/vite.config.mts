/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1000,
        emptyOutDir: true,
        outDir: "../wwwroot",
    },
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    test: {
        // @testing-library expects afterEach to be globally defined to run the cleanup after each
        // test, which is not the case with vitest by default.
        globals: true,
        setupFiles: ["./tests/setup.ts"],
    }
});
