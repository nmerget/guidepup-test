import { devices, PlaywrightTestConfig } from "@playwright/test";
import { screenReaderConfig } from "@guidepup/playwright";
import os from "os";

const isMacOS = os.platform() === "darwin";

const config: PlaywrightTestConfig = {
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 5 * 60 * 1000,
  retries: 2,
  use: {
    baseURL: "http://localhost:8080",
  },
  webServer: {
    command: "pnpm start",
    port: 8080,
    reuseExistingServer: !process.env.CI,
  },
  projects: isMacOS
    ? [
        {
          name: "voiceover",
          use: { ...devices["Desktop Chrome"], headless: false },
          testMatch: /voiceover\.spec\.ts/,
        },
      ]
    : [
        {
          name: "nvda",
          use: { ...devices["Desktop Chrome"], headless: false },
          testMatch: /nvda\.spec\.ts/,
        },
      ],
};

export default config;
