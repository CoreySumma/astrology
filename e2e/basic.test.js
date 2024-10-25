/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from "@playwright/test";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

test.describe("Injecting location...", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: {
        dir: `./${dayjs().format("MM-DD-YYYY")}_screen-recordings`,
      },
      permissions: ["geolocation"],
      geolocation: { latitude: 30.2672, longitude: -97.7431 }, // Austin, TX
    });

    page = await context.newPage();
  });

  test("Display zero state and load user data", async () => {
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Inject a black background for visibility since chronium doesn't support video (everything is white)
    await page.addStyleTag({
      content: `.video-background { background-color: black !important; }`,
    });

    await Promise.all([
      expect(page.locator(".zodiac-title")).toContainText("My zodiac sign is", {
        timeout: 20000,
      }),
      expect(page.locator(".swiper")).toBeVisible({ timeout: 20000 }),
      expect(page.getByRole("img", { name: "Aries" })).toBeVisible(),
    ]);

    await page.screenshot({
      path: `./${dayjs().format("MM-DD-YYYY")}_screenshots/${uuidv4()}_empty_state.png`,
    });
  });

  test("Change zodiac signs", async () => {
    // Basic nav with selector
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
  });

  test("Display and hide prediction loading icon when asking the universe", async () => {
    // Select Taurus
    await page.getByLabel("Go to slide 2").click();
    await expect(page.getByRole("img", { name: "Taurus" })).toBeVisible();
    await page.waitForSelector('[data-testid="spinner"]', { state: 'hidden' });
    // Click the "Ask The Universe" button
    const askButton = page.getByRole("button", { name: "Ask The Universe" });
    await expect(askButton).toBeVisible();
    await askButton.click();
    // Wait for the loading icon to appear and then disappear
    await expect(page.getByTestId("loading-prediction-icon")).toBeVisible();
    // Wait for animations
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `./${dayjs().format("MM-DD-YYYY")}_screenshots/${uuidv4()}_loading_prediction_state.png`,
    });
    await expect(page.getByTestId("loading-prediction-icon")).toBeHidden({
      timeout: 10000,
    });
    // Wait for the prediction to appear
    await expect(page.getByTestId("prediction")).toBeVisible();
    await expect(page.getByTestId("constellation")).toBeVisible();
    // Wait for animations
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: `./${dayjs().format("MM-DD-YYYY")}_screenshots/${uuidv4()}_fulfilled_prediction.png`,
    });
  });
  test.afterAll(async ({ browser }) => {
    // Add a delay to extend video recording time before closing so recording captures final state
    await page.waitForTimeout(8000); 
    await browser.close();
  });
});
