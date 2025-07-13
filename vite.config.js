import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    // php artisan serve --host=192.168.1.22 --port=8000
    // npm run dev
    // server: {
    //     host: "0.0.0.0",
    //     port: 5173,
    //     cors: true, // ✅ Enable CORS
    //     hmr: {
    //         host: "192.168.1.22", // ✅ Change to your local IP
    //     },
    // },
});
