import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
  stylesheets: [
    "/styles/reset.css",
    "/styles/tokens.css",
    "/styles/dendro.css",
  ],
  styles: [],
  scripts: [
    `
    import { define } from "@calpoly/mustang";
    import { HeaderElement } from "/scripts/header.js";

    define({
      "blz-header": HeaderElement
    });

    HeaderElement.initializeOnce();
      `,
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang",
  },
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}
