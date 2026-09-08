import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheFooter from "@/components/TheFooter.vue";

function mountFooter() {
  return mount(TheFooter, { global: { stubs: { RouterLink: RouterLinkStub } } });
}

describe("TheFooter", () => {
  it("links to every main page", () => {
    const targets = mountFooter()
      .findAllComponents(RouterLinkStub)
      .map((link) => link.props("to"));
    for (const path of ["/home", "/projects", "/about", "/contact", "/facts", "/privacy"]) {
      expect(targets).toContain(path);
    }
  });

  it("exposes external social links", () => {
    const hrefs = mountFooter()
      .findAll("a")
      .map((a) => a.attributes("href"));
    expect(hrefs).toContain("https://github.com/N-Chidiac");
    expect(hrefs.some((href) => href?.includes("linkedin.com"))).toBe(true);
  });

  it("treats the footer logo as decorative", () => {
    const logo = mountFooter().find(".logo img");
    expect(logo.attributes("alt")).toBe("");
  });
});
