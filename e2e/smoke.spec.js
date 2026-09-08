import { test, expect } from "@playwright/test";

test("root redirects to /home", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/home$/);
  await expect(page).toHaveTitle("Nour Chidiac — Web Developer");
});

test("every page has exactly one h1 and a canonical link", async ({ page }) => {
  for (const path of ["/home", "/projects", "/about", "/facts", "/contact", "/menu"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", new RegExp(`${path}$`));
  }
});

test("navigating from home to a project keeps meta in sync", async ({ page }) => {
  await page.goto("/home");
  await page
    .getByRole("link", { name: /projects/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/projects$/);

  await page.locator(".project-card, .card-link").first().click();
  await expect(page).toHaveURL(/\/project\/\d+$/);
  await expect(page.locator("h2.project-title")).toBeVisible();
  await expect(page).toHaveTitle(/— Nour Chidiac$/);
});

test("unknown routes land on the interactive 404 terminal", async ({ page }) => {
  await page.goto("/this/does/not/exist");
  await expect(page.locator(".screen")).toBeVisible();
  await expect(page.locator(".body")).toContainText("/this/does/not/exist");

  const input = page.locator(".term-input");
  await input.fill("help");
  await input.press("Enter");
  await expect(page.locator(".body")).toContainText("coffee");

  await input.fill("cd home");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/home$/);
});

test("invalid project ids fall through to the 404 terminal", async ({ page }) => {
  await page.goto("/project/999999");
  await expect(page.locator(".screen")).toBeVisible();
});

test("images carry alt text and decorative ones are explicitly empty", async ({ page }) => {
  await page.goto("/home");
  const missing = await page.locator("img:not([alt])").count();
  expect(missing).toBe(0);
});
