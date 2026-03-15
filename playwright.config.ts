import { defineConfig, devices } from "@playwright/test";

const HOST = "127.0.0.1";
const PORT = 3101;
const API_PORT = 3333;
const BASE_URL = `http://${HOST}:${PORT}`;
const API_URL = `http://${HOST}:${API_PORT}/products`;

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
	webServer: [
		{
			command: "pnpm mock-api",
			reuseExistingServer: true,
			timeout: 120_000,
			url: API_URL,
		},
		{
			command: `NEXT_DIST_DIR=.next-e2e next dev --hostname ${HOST} --port ${PORT}`,
			reuseExistingServer: true,
			timeout: 120_000,
			url: BASE_URL,
		},
	],
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
