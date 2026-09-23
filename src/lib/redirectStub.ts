/**
 * The page that lives at a renamed case study's old URL on GitHub Pages.
 *
 * Not a copy of index.html: that copy carries the home page's canonical, needs
 * JavaScript to redirect and boots the whole bundle to leave. A meta refresh
 * with a canonical to the new address and a plain link moves a reader and a
 * crawler in one request, with no script and no noindex (the old address
 * should pass its weight to the new one, not vanish).
 *
 * @param targetUrl Absolute URL of the page the old address moved to.
 */
export function redirectStubHtml(targetUrl: string): string {
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    "<title>Moved</title>",
    `<link rel="canonical" href="${targetUrl}">`,
    `<meta http-equiv="refresh" content="0; url=${targetUrl}">`,
    "</head>",
    "<body>",
    `<p>This page moved to <a href="${targetUrl}">${targetUrl}</a>.</p>`,
    "</body>",
    "</html>",
    "",
  ].join("\n");
}
