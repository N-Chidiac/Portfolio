import { describe, it, expect } from "vitest";
import { parseProjectDate, byDateDesc, sortByDateDesc, getProjectImage } from "@/utils/projects";

describe("parseProjectDate", () => {
  it("parses a DD-MM-YYYY string into a Date", () => {
    const date = parseProjectDate("09-02-2026");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(1); // februari
    expect(date.getDate()).toBe(9);
  });
});

describe("byDateDesc / sortByDateDesc", () => {
  const list = [
    { id: 1, date: "01-01-2026" },
    { id: 2, date: "15-03-2026" },
    { id: 3, date: "15-03-2026" },
  ];

  it("orders newest first", () => {
    const sorted = sortByDateDesc(list);
    expect(sorted.map((p) => p.id)).toEqual([3, 2, 1]);
  });

  it("breaks ties on the higher id", () => {
    expect(byDateDesc(list[1], list[2])).toBeGreaterThan(0);
  });

  it("does not mutate the input", () => {
    const copy = [...list];
    sortByDateDesc(list);
    expect(list).toEqual(copy);
  });
});

describe("getProjectImage", () => {
  it("resolves a bundled asset URL for a known project image", () => {
    expect(getProjectImage("./projects/portfolio.webp")).toBeTruthy();
  });

  it("returns undefined for an unknown image", () => {
    expect(getProjectImage("./projects/does-not-exist.webp")).toBeUndefined();
  });
});
