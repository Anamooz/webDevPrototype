import { LitElement, css, html } from "lit";
import { define } from "@calpoly/mustang";

export class GenshinHeaderElement extends LitElement {
  static uses = define({});

  render() {
    return html`
      <header>
        <h1>Best Genshin Character Builds</h1>
        <p>Best weapons, artifacts, and skills and materials you'll need</p>
        <nav>
          <a id="userLink" slot="actuator">
            Hello, <span id="userid" class="username"></span>
          </a>
          <menu>
            <li class="when-signed-in">
              <a id="signout">Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </nav>
      </header>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }

    header {
      justify-content: space-between;
      background-color: var(--color-background-page);
      color: var(--color-text);
      margin-left: 40px;
    }

    header p {
      font-size: 28px;
    }

    header h1 {
      font-size: 50px;
    }

    nav {
      display: flex;
      flex-direction: column;
      align-items: end;
      margin-right: 20px;
    }

    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
      text-decoration: none;
    }

    .username {
      text-decoration: underline;
    }

    #userid:empty::before {
      content: "traveler";
    }

    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;
}
