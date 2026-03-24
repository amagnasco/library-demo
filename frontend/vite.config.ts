import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/

export default defineConfig({
    resolve: {
        alias: {"@src": path.resolve(__dirname, "./src/"),},
        dedupe: ['react', 'react-dom']
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: '0.0.0.0',
        strictPort: true,
        port: 5173,
        //allowedHosts: ['example.com']
    },
    root: 'src',
    build: {
        outDir: './dist',
    emptyOutDir: true,
    },
})
