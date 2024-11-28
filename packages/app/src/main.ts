import {
  Auth,
  History,
  Switch,
  define
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { FavoriteViewElement } from "./views/favorites-view";
import { GenshinHeaderElement } from "./components/genshin-header";
import { HomeViewElement } from "./views/home-view.ts"

const routes = [
  {
    path: "/app/:username",
    view: (params: Switch.Params) => html`
      <favorites-view></favorites-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];
class AppElement extends LitElement {
  render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    GenshinHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "test:history", "test:auth");
    }
  },
  "genshin-app": AppElement,
  "genshin-header": GenshinHeaderElement,
  "favorites-view": FavoriteViewElement,
  "home-view": HomeViewElement,
});