import { test, expect } from "@playwright/test";

test.describe("Injecting location...", () => {
  test("Should display zero state", async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: { dir: "./test-results/screen-recordings" },
      permissions: ["geolocation"],
      viewport: { width: 1280, height: 720 },
      geolocation: { latitude: 51.507351, longitude: -0.127758 },
    });

    const page = await context.newPage();

    page.on("console", (msg) => console.log(`PAGE LOG: ${msg.text()}`));
    page.on("requestfailed", (request) =>
      console.log(
        `Failed request: ${request.url()} - ${request.failure().errorText}`
      )
    );

    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // videos do not load correctly in chromium
    // we inject a black background for visibility
    await page.addStyleTag({
      content: `
        .video-background {
          background-color: black !important;
          width: 100%;
          height: 100vh;
          display: block;
        }
      `,
    });
    await Promise.all([
      expect(page.locator(".zodiac-title")).toContainText("My zodiac sign is", {
        timeout: 20000,
      }),
      expect(page.locator(".swiper")).toBeVisible({ timeout: 20000 }),
      expect(page.getByRole("img", { name: "Aries" })).toBeVisible(),
    ]);

    await page.getByLabel("Go to slide 2").click();
    await expect(page.getByRole("img", { name: "Taurus" })).toBeVisible();

    await page.getByLabel("Go to slide 3").click();
    await expect(page.getByRole("img", { name: "Gemini" })).toBeVisible();

    await page.getByLabel("Go to slide 4").click();
    await expect(page.getByRole("img", { name: "Cancer" })).toBeVisible();

    await page.getByLabel("Go to slide 5").click();
    await expect(page.getByRole("img", { name: "Leo" })).toBeVisible();

    await page.getByLabel("Go to slide 6").click();
    await expect(page.getByRole("img", { name: "Virgo" })).toBeVisible();

    await page.getByLabel("Go to slide 7").click();
    await expect(page.getByRole("img", { name: "Libra" })).toBeVisible();

    await page.getByLabel("Go to slide 8").click();
    await expect(page.getByRole("img", { name: "Scorpio" })).toBeVisible();

    await page.getByLabel("Go to slide 9").click();
    await expect(page.getByRole("img", { name: "Sagittarius" })).toBeVisible();

    await page.getByLabel("Go to slide 10").click();
    await expect(page.getByRole("img", { name: "Capricorn" })).toBeVisible();

    await page.getByLabel("Go to slide 11").click();
    await expect(page.getByRole("img", { name: "Aquarius" })).toBeVisible();

    await page.getByLabel("Go to slide 12").click();
    await expect(page.getByRole("img", { name: "Pisces" })).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Ask The Universe" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Ask The Universe" }).click();
    await page.pause();
  });
});
