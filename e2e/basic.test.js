// eslint-disable-next-line
import { test } from "@playwright/test";


test.describe("Loading Location", () => {
  test("should display the swiper and grant location permissions", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: 50.8551729, longitude: 4.340312 },
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000");
  });
});
