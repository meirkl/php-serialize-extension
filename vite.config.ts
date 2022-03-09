import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact()],
    define: {
        'process.env': {},
    },
    build: {
        outDir: 'extension',
        sourcemap: false,
    },
});
