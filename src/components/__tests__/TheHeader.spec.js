import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheHeader from "@/components/TheHeader.vue";

function mountHeader(slots) {
  return mount(TheHeader, {
    slots,
    global: { stubs: { RouterLink: RouterLinkStub } },
  });
}

describe("TheHeader", () => {
  it("renders the title and subtitle slots", () => {
    const wrapper = mountHeader({ title: "CONTACT ME", subtitle: "SAY HELLO" });
    expect(wrapper.find("h1").text()).toBe("CONTACT ME");
    expect(wrapper.text()).toContain("SAY HELLO");
  });

  it("links to /home and /menu, not the bare root", () => {
    const targets = mountHeader({ title: "X" })
      .findAllComponents(RouterLinkStub)
      .map((link) => link.props("to"));
    expect(targets).toContain("/home");
    expect(targets).toContain("/menu");
    expect(targets).not.toContain("/");
  });

  it("gives every image a meaningful or explicitly empty alt (never 'Logo')", () => {
    const alts = mountHeader({ title: "X" })
      .findAll("img")
      .map((img) => img.attributes("alt"));
    expect(alts.length).toBeGreaterThan(0);
    for (const alt of alts) {
      expect(alt).toBeDefined();
      expect(alt).not.toBe("Logo");
    }
  });
});
