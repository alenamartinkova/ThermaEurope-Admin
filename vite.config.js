import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        checker({
            typescript: true,
        }),
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
    ],
});
