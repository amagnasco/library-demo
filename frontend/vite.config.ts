import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react({
        babel: {
            plugins: [
                ["babel-plugin-styled-components", {
                    displayName: true,
                    fileName: true
                }]
            ]
        }
    })],
    resolve: {alias: {"@src": path.resolve(__dirname, "./src/"),},},
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        //strictPort: true,
        //port: 5173,
        //allowedHosts: ['example.com']
    },
    //root: 'src',
    build: {
        outDir: './dist',
    emptyOutDir: true,
    },
})
