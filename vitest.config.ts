import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"server-only": path.resolve(__dirname, "./src/test/server-only.ts"),
		},
	},
	test: {
		environment: "jsdom",
		exclude: ["src/**/*.e2e.spec.ts"],
		setupFiles: ["./src/test/setup.tsx"],
		include: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
	},
});
