import { redirectStubHtml } from "./redirectStub";

/**
 * The file that lives at a renamed case study's old URL on GitHub Pages.
 *
 * Copying the built index.html there, as the emit-route-pages plugin does for
 * live routes, is the wrong shape for a moved page: its canonical points at the
 * home page, so a crawler would file the old address as a duplicate of the
 * wrong page; it needs JavaScript to redirect, so anything that does not run
 * it stays put; and it boots the whole bundle just to leave. A meta refresh
 * with a canonical to the new address and a plain link does the job in one
 * request and no script.
 */
describe("redirectStubHtml", () => {
  const TARGET = "https://chunduri-aditya.github.io/Portfolio/work/taintgate/";

  test("starts with an HTML5 doctype", () => {
    expect(redirectStubHtml(TARGET).trimStart().toLowerCase()).toMatch(/^<!doctype html>/);
  });

  test("redirects with a zero delay meta refresh to the target", () => {
    const html = redirectStubHtml(TARGET);
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain(`content="0; url=${TARGET}"`);
  });

  test("declares the target as canonical, so the old URL is not indexed twice", () => {
    const html = redirectStubHtml(TARGET);
    expect(html).toContain('rel="canonical"');
    // Attribute order is the author's choice; the pairing is what matters.
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(TARGET);
  });

  test("offers a plain link for anyone the refresh does not move", () => {
    expect(redirectStubHtml(TARGET)).toContain(`<a href="${TARGET}"`);
  });

  test("titles itself Moved", () => {
    expect(redirectStubHtml(TARGET)).toContain("<title>Moved</title>");
  });

  test("is not a copy of index.html", () => {
    const html = redirectStubHtml(TARGET);
    expect(html).not.toContain('id="root"');
    expect(html).not.toContain("<script");
    // The old URL should pass its weight to the new one, not be dropped.
    expect(html).not.toMatch(/noindex/i);
  });
});
