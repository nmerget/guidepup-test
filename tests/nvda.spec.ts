import { nvdaTest as test } from "@guidepup/playwright";
import { expect } from "@playwright/test";

const translations: Record<string, string[]> = {
  Test: ["Test"],
};

test.describe("Input field - NVDA", () => {
  test("I can type into the input with NVDA", async ({ page, nvda }) => {
    await page.goto("/", { waitUntil: "load" });

    const input = page.locator("#test");
    await input.waitFor();

    await nvda.navigateToWebContent();

    await nvda.type("Test");
    await nvda.press("Control+A");
    await nvda.press("Delete");
    await nvda.type("Test");

    await expect(input).toHaveValue("Test");

    const phraseLog: string[] = await nvda.spokenPhraseLog();
    let snapshot = JSON.stringify(phraseLog);

    for (const [key, values] of Object.entries(translations)) {
      for (const value of values) {
        snapshot = snapshot.replaceAll(value, key);
      }
    }

    expect(snapshot).toMatchSnapshot();
  });
});
