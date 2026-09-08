import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TheSkill from "@/components/TheSkill.vue";

describe("TheSkill", () => {
  it("renders the icon with the given alt text", () => {
    const img = mount(TheSkill, { props: { image: "/vue.png", alt: "Vue logo" } }).find("img");
    expect(img.attributes("src")).toBe("/vue.png");
    expect(img.attributes("alt")).toBe("Vue logo");
  });

  it("shows the label when text is provided", () => {
    const wrapper = mount(TheSkill, { props: { image: "/x.png", alt: "x", text: "VueJs" } });
    expect(wrapper.find("p").exists()).toBe(true);
    expect(wrapper.text()).toBe("VueJs");
  });

  it("omits the label element when no text is given", () => {
    const wrapper = mount(TheSkill, { props: { image: "/x.png", alt: "x" } });
    expect(wrapper.find("p").exists()).toBe(false);
  });
});
