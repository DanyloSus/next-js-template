import { test, expect } from "@playwright/test";

test("home page renders the template heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Next.js Template" })
  ).toBeVisible();
});
