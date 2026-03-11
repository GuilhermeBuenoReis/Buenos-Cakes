import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
	testDir: "./src",
	testMatch: "**/*.e2e.spec.ts",
	fullyParallel: true,
	retries: 0,
	use: {
		baseURL: BASE_URL,
		screenshot: "only-on-failure",
		trace: "on",
		video: "retain-on-failure",
	},
	webServer: {
		command: "pnpm dev:e2e",
		reuseExistingServer: true,
		timeout: 120_000,
		url: BASE_URL,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
