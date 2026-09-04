import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import TheProjectCard from "@/components/TheProjectCard.vue";

describe("TheProjectCard", () => {
  it("renders the project title and subtitle", () => {
    const wrapper = mount(TheProjectCard, {
      props: {
        id: 1,
        title: "Portfolio Website",
        subtitle: "School project",
        image: "/portfolio.webp",
      },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.text()).toContain("Portfolio Website");
    expect(wrapper.text()).toContain("School project");
  });

  it("links to the project detail route for its id", () => {
    const wrapper = mount(TheProjectCard, {
      props: {
        id: 7,
        title: "Quiz Web App",
        subtitle: "Personal project",
        image: "/quiz.webp",
      },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.findComponent(RouterLinkStub).props("to")).toBe("/project/7");
  });
});
