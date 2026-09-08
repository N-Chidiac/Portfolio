import { describe, it, expect } from "vitest";
import { truncate, projectMeta, PRERENDER_ROUTES, SITE_URL } from "@/seo";

describe("truncate", () => {
  it("leaves short text untouched", () => {
    expect(truncate("kort", 20)).toBe("kort");
  });

  it("cuts on a word boundary and appends an ellipsis", () => {
    const out = truncate("een wat langere zin die afgekapt moet worden", 20);
    expect(out.length).toBeLessThanOrEqual(21);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toContain("  ");
  });
});

describe("projectMeta", () => {
  it("builds a title, path and clamped description", () => {
    const meta = projectMeta({
      id: 7,
      name: "Quiz Web App",
      description: ["Een quiz webapp ".repeat(20)],
    });
    expect(meta.path).toBe("/project/7");
    expect(meta.title).toBe("Quiz Web App — Nour Chidiac");
    expect(meta.description.length).toBeLessThanOrEqual(156);
  });

  it("flattens newlines in the project name", () => {
    const meta = projectMeta({ id: 19, name: "Rondgangen &\nKPI-controles", description: ["x"] });
    expect(meta.title).toBe("Rondgangen & KPI-controles — Nour Chidiac");
  });
});

describe("PRERENDER_ROUTES", () => {
  it("covers the public static pages with absolute-ready paths", () => {
    const paths = PRERENDER_ROUTES.map((r) => r.path);
    expect(paths).toContain("/home");
    expect(paths).toContain("/projects");
    for (const route of PRERENDER_ROUTES) {
      expect(route.path.startsWith("/")).toBe(true);
      expect(route.title).toBeTruthy();
      expect(route.description).toBeTruthy();
    }
  });

  it("exposes the production site URL without a trailing slash", () => {
    expect(SITE_URL).toBe("https://nourchidiac.netlify.app");
  });
});
