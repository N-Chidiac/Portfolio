import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TheImage from "@/components/TheImage.vue";

function mountImage(props) {
  return mount(TheImage, {
    props: { src: "/x.webp", alt: "Een foto", ratio: "360/460", ...props },
  });
}

describe("TheImage", () => {
  it("renders an <img> with the given src and alt", () => {
    const img = mountImage().find("img");
    expect(img.attributes("src")).toBe("/x.webp");
    expect(img.attributes("alt")).toBe("Een foto");
  });

  it("applies the aspect ratio to the wrapper", () => {
    expect(mountImage().element.style.aspectRatio).toBe("360/460");
  });

  it("lazy-loads by default and passes through an explicit loading value", () => {
    expect(mountImage().find("img").attributes("loading")).toBe("lazy");
    expect(mountImage({ loading: "eager" }).find("img").attributes("loading")).toBe("eager");
  });

  it("reveals the image only once it has loaded", async () => {
    const wrapper = mountImage();
    const img = wrapper.find("img");
    expect(img.classes()).not.toContain("is-loaded");
    expect(wrapper.find(".image-skeleton").element.style.display).not.toBe("none");
    await img.trigger("load");
    await wrapper.vm.$nextTick();
    expect(img.classes()).toContain("is-loaded");
    expect(wrapper.find(".image-skeleton").element.style.display).toBe("none");
  });
});
