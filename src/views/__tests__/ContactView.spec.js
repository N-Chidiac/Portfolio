import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import ContactView from "@/views/ContactView.vue";

function mountContact() {
  return mount(ContactView, {
    global: { stubs: { RouterLink: RouterLinkStub, TheHeader: true, TheFooter: true } },
  });
}

describe("ContactView", () => {
  it("prefills a subject and greeting on the mailto links", () => {
    const mailtos = mountContact()
      .findAll('a[href^="mailto:"]')
      .map((a) => a.attributes("href"));
    expect(mailtos.length).toBeGreaterThan(0);
    for (const href of mailtos) {
      expect(href).toContain("nour.chidiac@hotmail.com");
      expect(href).toContain("subject=");
      expect(href).toContain("body=");
    }
  });

  it("keeps the email address unchanged in the visible card", () => {
    expect(mountContact().text()).toContain("nour.chidiac@hotmail.com");
  });
});
