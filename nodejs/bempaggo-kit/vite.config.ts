/// <reference types="vitest" />
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    define : { "process.env.NODE": "process.env.NODE" },
    test: {
        globals: true,
        deps: { inline: ['totalist'] }
    },
    
});
