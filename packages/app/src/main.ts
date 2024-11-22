import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { FavoriteViewElement } from "./views/favorites-view";
import { GenshinHeaderElement } from "./components/genshin-header";

class AppElement extends LitElement {
  static uses = define({
    "favorites-view": FavoriteViewElement
  });

  protected render() {
    return html`
      <favorites-view></favorites-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    GenshinHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "genshin-app": AppElement,
  "genshin-header": GenshinHeaderElement
});