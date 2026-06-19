import { voiceOverTest as test } from "@guidepup/playwright";
import { expect } from "@playwright/test";

const translations: Record<string, string[]> = {
  Test: ["Test"],
};

test.describe("Input field - VoiceOver", () => {
  test("I can type into the input with VoiceOver", async ({
    page,
    voiceOver,
  }) => {
    await page.goto("/", { waitUntil: "load" });

    const input = page.locator("#test");
    await input.waitFor();

    await voiceOver.navigateToWebContent();

    await voiceOver.type("Test");
    await voiceOver.press("Command+A");
    await voiceOver.press("Delete");
    await voiceOver.type("Test");

    await expect(input).toHaveValue("Test");

    const phraseLog: string[] = await voiceOver.spokenPhraseLog();
    let snapshot = JSON.stringify(phraseLog);

    for (const [key, values] of Object.entries(translations)) {
      for (const value of values) {
        snapshot = snapshot.replaceAll(value, key);
      }
    }

    expect(snapshot).toMatchSnapshot();
  });
});
