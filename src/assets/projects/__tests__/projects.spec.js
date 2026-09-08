import { describe, it, expect } from "vitest";
import { projects } from "@/assets/projects/projects";

const VALID_TYPES = ["School project", "Personal project", "Student job project"];
const DATE_RE = /^\d{2}-\d{2}-\d{4}$/;
const IMAGE_RE = /^\.\/projects\/.+\.(webp|png|jpg|jpeg|svg)$/;
const VALID_TECH = [
  "html",
  "css",
  "javascript",
  "vue",
  "nodejs",
  "vscode",
  "npm",
  "figma",
  "illustrator",
  "photoshop",
  "vite",
  "pinia",
  "express",
  "database",
  "docker",
  "jwt",
];

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(projects)("project #%# ($name) has the required fields", (project) => {
    expect(project.name).toBeTruthy();
    expect(project.image).toMatch(IMAGE_RE);
    expect(Array.isArray(project.description)).toBe(true);
    expect(project.description.length).toBeGreaterThan(0);
    expect(VALID_TYPES).toContain(project.type);
    expect(project.date).toMatch(DATE_RE);
    expect(Array.isArray(project.tech)).toBe(true);
    for (const tech of project.tech) {
      expect(VALID_TECH).toContain(tech);
    }
    expect(new Set(project.tech).size).toBe(project.tech.length);
  });
});
