// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
	base: "/",
	server: {
		open: true, // This opens the browser automatically
	},
	build: {
		assetsInlineLimit: 0,
	},
});
