import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheButton from "@/components/TheButton.vue";

describe("TheButton", () => {
  it("renders the given text", () => {
    const wrapper = mount(TheButton, {
      props: { text: "Contact me", path: "/contact" },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.text()).toContain("Contact me");
  });

  it("applies the given color as the button background", () => {
    const wrapper = mount(TheButton, {
      props: { text: "Click", path: "/", color: "#4e765d" },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.find("button").element.style.backgroundColor).toBe("rgb(78, 118, 93)");
  });

  it("links to the given path via RouterLink by default", () => {
    const wrapper = mount(TheButton, {
      props: { text: "Projects", path: "/projects" },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.findComponent(RouterLinkStub).props("to")).toBe("/projects");
  });

  it("renders a download link instead of a RouterLink when download is set", () => {
    const wrapper = mount(TheButton, {
      props: { text: "CV", path: "/cv.pdf", download: "cv.pdf" },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    const link = wrapper.find("a");
    expect(link.attributes("href")).toBe("/cv.pdf");
    expect(link.attributes("download")).toBe("cv.pdf");
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(false);
  });
});
