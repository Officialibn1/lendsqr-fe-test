import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@/styles/_variables.scss" as *;`,
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"react-vendor": ["react", "react-dom"],
					"router-vendor": ["react-router", "react-router/dom"],
					"ui-vendor": [
						"@radix-ui/themes",
						"@radix-ui/react-label",
						"@radix-ui/react-slot",
					],
					"table-vendor": ["@tanstack/react-table"],
					"redux-vendor": ["@reduxjs/toolkit", "react-redux", "redux-persist"],
					"form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
					"icons-vendor": ["react-icons", "lucide-react"],
					"utils-vendor": ["date-fns", "use-debounce", "sonner"],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
});
