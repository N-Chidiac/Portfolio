import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import TheButton from "@/components/TheButton.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: { template: "<div />" } },
    { path: "/projects", component: { template: "<div />" } },
    { path: "/contact", component: { template: "<div />" } },
  ],
});

function mountButton(props) {
  return mount(TheButton, { props, global: { plugins: [router] } });
}

beforeEach(async () => {
  await router.push("/");
  await router.isReady();
});

describe("TheButton", () => {
  it("renders the given text", () => {
    const wrapper = mountButton({ text: "Contact me", path: "/contact" });
    expect(wrapper.text()).toContain("Contact me");
  });

  it("applies the given color as the button background", () => {
    const wrapper = mountButton({ text: "Click", path: "/", color: "#4e765d" });
    expect(wrapper.find("button").element.style.backgroundColor).toBe("rgb(78, 118, 93)");
  });

  it("renders a single <button> element, never nested in a link", () => {
    const wrapper = mountButton({ text: "Projects", path: "/projects" });
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("a").exists()).toBe(false);
  });

  it("navigates to the given path on click", async () => {
    const wrapper = mountButton({ text: "Projects", path: "/projects" });
    await wrapper.find("button").trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/projects");
  });

  it("triggers a download instead of navigating when download is set", async () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function () {
      this.dataset.clicked = "true";
    });

    const wrapper = mountButton({ text: "CV", path: "/cv.pdf", download: "cv.pdf" });
    await wrapper.find("button").trigger("click");

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(router.currentRoute.value.path).toBe("/");
    clickSpy.mockRestore();
  });
});
