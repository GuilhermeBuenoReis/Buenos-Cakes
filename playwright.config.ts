import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: "./src",
	testMatch: "**/*.e2e.spec.ts",
	fullyParallel: true,
	retries: 0,
	use: {
		baseURL: BASE_URL,
		trace: "on-first-retry",
	},
	webServer: {
		command: `pnpm dev --port ${PORT}`,
		reuseExistingServer: true,
		url: BASE_URL,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
