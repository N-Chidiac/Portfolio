import { describe, it, expect, beforeEach } from "vitest";
import router from "@/router";

describe("router", () => {
  beforeEach(async () => {
    await router.push("/");
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

  it("sets document.title from the matched route's meta", async () => {
    await router.push("/projects");
    expect(document.title).toBe("Projects — Nour Chidiac");
  });

  it("sets the full title for the home route without duplicating the name", async () => {
    await router.push("/home");
    expect(document.title).toBe("Nour Chidiac — Web Developer");
  });
});
