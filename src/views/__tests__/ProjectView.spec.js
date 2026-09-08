import { describe, it, expect, beforeEach } from "vitest";
import { mount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import ProjectView from "@/views/ProjectView.vue";
import { projects } from "@/assets/projects/projects";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: { template: "<div />" } },
    { path: "/projects", component: { template: "<div />" } },
    { path: "/contact", component: { template: "<div />" } },
    { path: "/project/:id", name: "id", component: ProjectView },
  ],
});

async function mountProject(id) {
  await router.push(`/project/${id}`);
  await router.isReady();
  const wrapper = mount(ProjectView, {
    global: {
      plugins: [router],
      stubs: { RouterLink: RouterLinkStub, TheHeader: true, TheFooter: true, TheButton: true },
    },
  });
  await flushPromises();
  return wrapper;
}

beforeEach(async () => {
  await router.push("/project/1");
});

describe("ProjectView", () => {
  it("renders the project name and description", async () => {
    const wrapper = await mountProject(1);
    const project = projects.find((p) => p.id === 1);
    expect(wrapper.find(".project-title").text()).toBe(project.name);
    expect(wrapper.text()).toContain(project.description[0].slice(0, 40));
  });

  it("derives the tech list from the tech array", async () => {
    const wrapper = await mountProject(1);
    const labels = wrapper.findAll(".tech-item span").map((s) => s.text());
    expect(labels).toContain("HTML");
    expect(labels).toContain("Illustrator");
    expect(labels).not.toContain("Docker");
  });

  it("shows the confidentiality note for a student job project", async () => {
    const wrapper = await mountProject(13);
    expect(wrapper.find(".confidential-note").exists()).toBe(true);
    expect(wrapper.text()).toContain("Polymer Contractors");
  });

  it("hides the confidentiality note for a personal project", async () => {
    const personal = projects.find((p) => p.type === "Personal project");
    const wrapper = await mountProject(personal.id);
    expect(wrapper.find(".confidential-note").exists()).toBe(false);
  });

  it("only shows a GitHub link when the project has one", async () => {
    const withRepo = await mountProject(2);
    expect(withRepo.text()).toContain("GitHub Repository");
    const withoutRepo = await mountProject(13);
    expect(withoutRepo.text()).not.toContain("GitHub Repository");
  });
});
