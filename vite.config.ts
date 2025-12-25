// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				notFound: resolve(__dirname, "404.html"),
			},
		},
		assetsInlineLimit: 0,
	},
	server: {
		open: true, // This opens the browser automatically
	},
});
