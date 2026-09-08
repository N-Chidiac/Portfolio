import { describe, it, expect, beforeEach } from "vitest";
import router from "@/router";
import { PRERENDER_ROUTES } from "@/seo";

function canonical() {
  return document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");
}

function metaContent(selector) {
  return document.head.querySelector(selector)?.getAttribute("content");
}

describe("router", () => {
  beforeEach(async () => {
    await router.push("/home");
    await router.isReady();
  });

  it("redirects the root path to /home", async () => {
    await router.push("/");
    expect(router.currentRoute.value.path).toBe("/home");
    expect(router.currentRoute.value.name).toBe("home");
  });

  it("serves the menu on its own /menu route", () => {
    expect(router.hasRoute("menu")).toBe(true);
    const menu = router.resolve("/menu");
    expect(menu.name).toBe("menu");
    expect(menu.meta.noindex).toBe(true);
  });

  it("resolves an unknown path to the not-found route", async () => {
    await router.push("/this-page-does-not-exist");
    expect(router.currentRoute.value.name).toBe("not-found");
  });

  it("registers all expected top-level routes", () => {
    const names = [
      "menu",
      "home",
      "projects",
      "id",
      "about",
      "fun-facts",
      "contact",
      "privacy-policy",
      "not-found",
    ];
    for (const name of names) {
      expect(router.hasRoute(name)).toBe(true);
    }
  });

  it("sends an unknown project id to the not-found route", async () => {
    await router.push("/project/999999");
    expect(router.currentRoute.value.name).toBe("not-found");
  });

  it("keeps a known project id on the project route", async () => {
    await router.push("/project/1");
    expect(router.currentRoute.value.name).toBe("id");
  });

  it("sets the full title for the home route without duplicating the name", async () => {
    await router.push("/home");
    expect(document.title).toBe("Nour Chidiac — Web Developer");
  });

  it("sets title, description and canonical from the matched route", async () => {
    await router.push("/projects");
    expect(document.title).toBe("Projects — Nour Chidiac");
    expect(canonical()).toBe("https://nourchidiac.netlify.app/projects");
    expect(metaContent('meta[name="description"]')).toContain("projecten");
    expect(metaContent('meta[property="og:url"]')).toBe("https://nourchidiac.netlify.app/projects");
  });

  it("derives per-project meta on a project detail route", async () => {
    await router.push("/project/1");
    expect(document.title).toBe("Portfolio Website — Nour Chidiac");
    expect(canonical()).toBe("https://nourchidiac.netlify.app/project/1");
    expect(metaContent('meta[name="robots"]')).toBe("index, follow");
  });

  it("marks noindex routes accordingly", async () => {
    await router.push("/menu");
    expect(metaContent('meta[name="robots"]')).toBe("noindex, follow");
  });

  it("keeps the router route meta in sync with the prerender route list", () => {
    for (const route of PRERENDER_ROUTES) {
      const resolved = router.resolve(route.path);
      const expectedTitle =
        route.path === "/home" ? route.title : `${resolved.meta.title} — Nour Chidiac`;
      expect(expectedTitle).toBe(route.title);
      expect(resolved.meta.description).toBe(route.description);
    }
  });
});
