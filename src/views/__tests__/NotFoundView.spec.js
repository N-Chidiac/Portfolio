import { describe, it, expect, beforeEach } from "vitest";
import { mount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: { template: "<div />" } },
    { path: "/home", component: { template: "<div />" } },
    { path: "/projects", component: { template: "<div />" } },
    { path: "/contact", component: { template: "<div />" } },
    { path: "/:pathMatch(.*)*", name: "nf", component: NotFoundView },
  ],
});

async function mountView() {
  await router.push("/geen-idee");
  await router.isReady();
  return mount(NotFoundView, {
    global: { plugins: [router], stubs: { RouterLink: RouterLinkStub } },
  });
}

async function type(wrapper, command) {
  await wrapper.find(".term-input").setValue(command);
  await wrapper.find(".input-row").trigger("submit");
  await flushPromises();
}

beforeEach(async () => {
  await router.push("/geen-idee");
});

describe("NotFoundView terminal", () => {
  it("shows the attempted path in the boot output", async () => {
    const wrapper = await mountView();
    expect(wrapper.find(".body").text()).toContain("/geen-idee");
  });

  it("fills the viewport without page scroll", async () => {
    const wrapper = await mountView();
    expect(wrapper.find(".screen").exists()).toBe(true);
  });

  it("reports unknown commands", async () => {
    const wrapper = await mountView();
    await type(wrapper, "banana");
    expect(wrapper.text()).toContain("command not found: banana");
  });

  it("lists every command under help, including coffee", async () => {
    const wrapper = await mountView();
    await type(wrapper, "help");
    const text = wrapper.text();
    for (const cmd of ["ls", "cd", "whoami", "history", "echo", "coffee", "matrix", "sudo"]) {
      expect(text).toContain(cmd);
    }
  });

  it("answers whoami", async () => {
    const wrapper = await mountView();
    await type(wrapper, "whoami");
    expect(wrapper.text()).toContain("Nour Chidiac");
  });

  it("clears the screen", async () => {
    const wrapper = await mountView();
    await type(wrapper, "whoami");
    await type(wrapper, "clear");
    expect(wrapper.find(".body").text()).not.toContain("Nour Chidiac");
  });

  it("navigates with cd", async () => {
    const wrapper = await mountView();
    await type(wrapper, "cd projects");
    await new Promise((r) => setTimeout(r, 550));
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/projects");
  });

  it("offers clickable quick links to real pages", async () => {
    const wrapper = await mountView();
    expect(wrapper.findAll(".link").map((b) => b.text())).toEqual(
      expect.arrayContaining(["home", "projects", "contact"]),
    );
  });
});
